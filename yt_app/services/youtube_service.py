from pytube import YouTube
from youtube_search import YoutubeSearch

class YouTubeService:
    def get_trending_videos(self):
        results = YoutubeSearch('trending', max_results=20).to_dict()
        print(results)
        return self._format_results(results)

    def search_videos(self, query):
        results = YoutubeSearch(query, max_results=20).to_dict()
        return self._format_results(results)

    def _format_results(self, results):
        return [{
            'id': result['id'],
            'title': result['title'],
            'thumbnail': result['thumbnails'][0],
            'duration': result['duration'],
            'channel': result['channel']
        } for result in results]
