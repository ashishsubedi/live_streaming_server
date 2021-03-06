from flask import Flask, request, Response, jsonify, render_template
from flask_redis import FlaskRedis

import json
import urllib.request as r
from uuid import uuid4

REDIS_URL = "redis://localhost:6379/0"


app = Flask(__name__)
redis_client = FlaskRedis(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stream/<string:id>',methods=['GET'])
def handleStream(id):
    '''
    Routeto view stream
    GET - Use unique id to get stream
    '''
    return render_template('stream.html',id=id)

@app.route('/streamkey/<string:secret>')
def get_stream_key(secret):
    # Get the logged in user info
    stream_key = uuid4().hex
    redis_client.set(stream_key,json.dumps( {'id':secret}))
    return stream_key



@app.route('/streams',methods=['GET'])
def get_streams():
    webURL = r.urlopen('http://localhost:8000/api/streams')
    data = webURL.read()
    print(data)
    encoding = webURL.info().get_content_charset('utf-8')
    result = json.loads(data.decode(encoding))
    parsed_result = parseStreamsData(result)
    return parsed_result

def parseStreamsData(data):

    return data