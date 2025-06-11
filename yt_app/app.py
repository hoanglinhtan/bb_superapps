from flask import Flask, render_template, request, Response, jsonify
from services.youtube_service import YouTubeService
from services.video_service import VideoService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Security settings
app.config['SERVER_NAME'] = None
app.config['PREFERRED_URL_SCHEME'] = 'http'

youtube_service = YouTubeService()
video_service = VideoService()

@app.route('/')
def index():
    trending_videos = youtube_service.get_trending_videos()
    return render_template('index.html', videos=trending_videos)

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/api/search')
def api_search():
    query = request.args.get('q', '')
    videos = youtube_service.search_videos(query)
    return jsonify(videos)

@app.route('/stream/<video_id>')
def stream_video(video_id):
    return Response(
        video_service.stream_3gp(video_id),
        mimetype='video/3gpp',
        headers={
            'Content-Disposition': f'attachment; filename="{video_id}.3gp"',
            'Content-Type': 'video/3gpp'
        }
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
