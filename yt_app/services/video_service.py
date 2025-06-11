from pytube import YouTube
import yt_dlp
import ffmpeg
import os
import tempfile
import subprocess
import logging
from time import sleep
from urllib.error import HTTPError
import ssl
import certifi

logger = logging.getLogger(__name__)

class VideoService:
    MAX_RETRIES = 3
    CHUNK_SIZE = 8192
    
    def __init__(self):
        self.ffmpeg_path = self._get_ffmpeg_path()
        if not self.ffmpeg_path:
            raise RuntimeError("FFmpeg not found. Please install FFmpeg first.")
        
        # Create temp directory for conversions
        self.temp_dir = tempfile.mkdtemp()

    def __del__(self):
        # Cleanup temp directory
        if hasattr(self, 'temp_dir') and os.path.exists(self.temp_dir):
            try:
                os.rmdir(self.temp_dir)
            except:
                pass

    def _get_ffmpeg_path(self):
        """Find ffmpeg executable path"""
        try:
            # Try common locations
            common_paths = [
                'ffmpeg',
                '/usr/bin/ffmpeg',
                '/usr/local/bin/ffmpeg',
                '/opt/homebrew/bin/ffmpeg',  # Common macOS Homebrew path
                r'C:\Program Files\ffmpeg\bin\ffmpeg.exe',  # Windows
            ]
            
            # First try which/where command
            try:
                which_cmd = 'where' if os.name == 'nt' else 'which'
                return subprocess.check_output([which_cmd, 'ffmpeg']).decode().strip()
            except:
                # Try common paths
                for path in common_paths:
                    if os.path.exists(path):
                        return path
                return None
        except:
            return None

    def stream_3gp(self, video_id):
        logger.debug(f"Starting video conversion for {video_id}")
        if not self.ffmpeg_path:
            yield self._create_error_message("FFmpeg not found")
            return

        temp_input = os.path.join(self.temp_dir, f'input_{video_id}.mp4')
        temp_output = os.path.join(self.temp_dir, f'output_{video_id}.3gp')

        try:
            # Download YouTube video using yt-dlp
            url = f'https://youtube.com/watch?v={video_id}'
            ydl_opts = {
                'format': 'bv*[height<=480][ext=mp4]+ba[ext=m4a]/b[height<=480][ext=mp4]',  # More flexible format selection
                'outtmpl': temp_input,
                'quiet': True,
                'no_warnings': True,
                'extract_flat': False,
                'merge_output_format': 'mp4',
                'nocheckcertificate': True,
                'http_headers': {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Connection': 'keep-alive',
                },
                'socket_timeout': 10,
                'retries': 3,
                'fragment_retries': 3,
                'ignoreerrors': True,
                # Add SSL context
                'source_address': '0.0.0.0',
                'extern_downloader_args': {
                    'curl': ['--insecure'],
                },
                'ssl_cert_file': certifi.where()
            }

            # Set SSL context for the entire process
            ssl._create_default_https_context = ssl._create_unverified_context
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                logger.debug("Starting video download")
                try:
                    info = ydl.extract_info(url, download=False)
                    available_formats = [f['format_id'] for f in info['formats']]
                    logger.debug(f"Available formats: {available_formats}")
                    
                    # Try to select an available format
                    for fmt in ['18', '135', '134', '133']:  # Common mobile-friendly formats
                        if fmt in available_formats:
                            ydl_opts['format'] = fmt
                            logger.debug(f"Selected format: {fmt}")
                            break
                    
                    ydl.download([url])
                except Exception as e:
                    logger.error(f"Download error: {str(e)}")
                    # Try alternative method without format selection
                    ydl_opts['format'] = 'best[ext=mp4]/best'
                    with yt_dlp.YoutubeDL(ydl_opts) as ydl2:
                        ydl2.download([url])

            # Convert to 3GP using BlackBerry 9930 compatible parameters
            try:
                logger.debug(f"Running FFmpeg command for {video_id}")
                process = subprocess.run([
                    self.ffmpeg_path,
                    '-i', temp_input,
                    '-s', '176x144',        # Standard 3GP resolution
                    '-vcodec', 'h263',      # Standard H.263
                    '-r', '12',             # Reduced frame rate for better compatibility
                    '-b:v', '64k',          # Lower video bitrate
                    '-acodec', 'libopencore_amrnb',  # Explicit codec
                    '-ar', '8000',          
                    '-ac', '1',
                    '-ab', '12.2k',         # Fixed AMR-NB bitrate
                    '-strict', 'experimental',  # Allow experimental codecs
                    '-brand', '3gp4',       # 3GPP Release 4
                    '-f', '3gp',            # Force 3GP container
                    '-y',
                    temp_output
                ], check=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                
                logger.debug(f"FFmpeg output: {process.stdout.decode()}")
                if process.stderr:
                    logger.warning(f"FFmpeg warnings: {process.stderr.decode()}")
                    
            except subprocess.CalledProcessError as e:
                logger.error(f"FFmpeg error: {e.stderr.decode()}")
                raise
            
            logger.debug(f"Starting to stream converted file: {temp_output}")
            # Stream the converted file
            with open(temp_output, 'rb') as f:
                while True:
                    chunk = f.read(self.CHUNK_SIZE)
                    if not chunk:
                        break
                    yield chunk

        except Exception as e:
            logger.exception(f"Error in stream_3gp: {str(e)}")
            yield self._create_error_message(f"Failed to stream video")

        finally:
            # Cleanup temp files
            for temp_file in [temp_input, temp_output]:
                if os.path.exists(temp_file):
                    try:
                        os.unlink(temp_file)
                    except:
                        pass

    def _create_error_message(self, message):
        temp_error = os.path.join(self.temp_dir, 'error.3gp')
        try:
            # Create error video in one step
            subprocess.run([
                self.ffmpeg_path,
                '-f', 'lavfi',
                '-i', f'color=c=black:s=176x144:d=5:r=12',  # Fixed framerate
                '-f', 'lavfi',
                '-i', 'aevalsrc=0:d=5:s=8000',  # Silent audio
                '-vf', f'drawtext=text=\'{message}\':fontsize=14:x=(w-text_w)/2:y=(h-text_h)/2:fontcolor=white',
                '-c:v', 'h263',
                '-c:a', 'libopencore_amrnb',
                '-ar', '8000',
                '-ac', '1',
                '-ab', '12.2k',
                '-r', '12',
                '-b:v', '64k',
                '-shortest',
                '-brand', '3gp4',
                '-f', '3gp',
                '-y',
                temp_error
            ], check=True, stderr=subprocess.PIPE)  # Capture errors

            with open(temp_error, 'rb') as f:
                return f.read()
        except subprocess.CalledProcessError as e:
            print(f"FFmpeg error: {e.stderr.decode()}")
            return b"Error: Video conversion failed"
        except Exception as e:
            print(f"Error creating message: {str(e)}")
            return b"Error: Video conversion failed"
        finally:
            if os.path.exists(temp_error):
                try:
                    os.unlink(temp_error)
                except:
                    pass
