from flask import Flask, request, json, render_template
from utils import MovieSearch, NprFeed

#TODO: cache these
movies = MovieSearch()
npr = NprFeed()


app = Flask(__name__)
@app.route('/', methods=['GET'])
def render_html():
   return render_template('moviesearch.html')

@app.route('/post', methods=['POST'])
def post():
    jsonout = json.loads(request.data)
    final = []
    response_data = json.dumps({"response_data": final})
    return response_data

@app.route('/get', methods=['GET'])
def get():
    entry_list = npr.return_list()
    jsonout = json.dumps(movies.data)
    return jsonout

@app.route('/rss', methods=['GET'])
def rss():
    entry_list = npr.return_list()
    jsonout = json.dumps(entry_list)
    return jsonout

if __name__ == '__main__':
    app.run(debug=True)
