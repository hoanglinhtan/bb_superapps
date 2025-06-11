from pytube import YouTube
import ffmpeg
import os
import tempfile
import subprocess
from time import sleep
from urllib.error import HTTPError

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
        if not self.ffmpeg_path:
            yield self._create_error_message("FFmpeg not found")
            return

        temp_input = os.path.join(self.temp_dir, f'input_{video_id}.mp4')
        temp_output = os.path.join(self.temp_dir, f'output_{video_id}.3gp')

        try:
            # Download YouTube video
            url = f'https://youtube.com/watch?v={video_id}'
            yt = YouTube(url)
            stream = (yt.streams
                     .filter(progressive=True, file_extension='mp4')
                     .order_by('resolution')
                     .first())

            if not stream:
                raise Exception("No suitable stream found")

            # Download to temp file
            stream.download(filename=temp_input)

            # Convert to 3GP using BlackBerry 9930 compatible parameters
            subprocess.run([
                self.ffmpeg_path,
                '-i', temp_input,
                '-s', '176x144',        # Standard 3GP resolution
                '-vcodec', 'h263',      # Standard H.263
                '-r', '12',             # Reduced frame rate for better compatibility
                '-b:v', '64k',          # Lower video bitrate
                '-acodec', 'amr_nb',    # Standard AMR-NB audio
                '-ar', '8000',          
                '-ac', '1',
                '-b:a', '12.2k',
                '-strict', 'experimental',  # Allow experimental codecs
                '-f', '3gp',            # Force 3GP container
                '-y',
                temp_output
            ], check=True)

            # Stream the converted file
            with open(temp_output, 'rb') as f:
                while True:
                    chunk = f.read(self.CHUNK_SIZE)
                    if not chunk:
                        break
                    yield chunk

        except Exception as e:
            print(f"Error streaming video: {str(e)}")
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
            subprocess.run([
                self.ffmpeg_path,
                '-f', 'lavfi',
                '-i', f'color=c=black:s=176x144:d=5',  # Match H.263 resolution
                '-vf', f'drawtext=text=\'{message}\':fontsize=14:x=(w-text_w)/2:y=(h-text_h)/2:fontcolor=white',
                '-c:v', 'h263',         # Changed to standard h263
                '-r', '12',
                '-b:v', '64k',
                '-strict', 'experimental',
                '-f', '3gp',
                '-y',
                temp_error
            ], check=True)

            with open(temp_error, 'rb') as f:
                return f.read()
        except:
            return b"Error: Video conversion failed"
        finally:
            if os.path.exists(temp_error):
                try:
                    os.unlink(temp_error)
                except:
                    pass
