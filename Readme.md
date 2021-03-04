## live_streaming_server
This project is platform where users can live stream using RTMP protocol. Tested on OBS.

## How to run?
- Create python virtual environment using <code> python -m venv venv </code> and then run <code> pip install -r requirements.txt </code> 
- Run <code> export FLASK_APP=app/app.py </code> if linux or mac, <code> set FLASK_APP=app/app.py </code> on windows
- <code> flask run </code>
- In another terminal, go inside node_server folder and run <code> npm install </code> and <code> node index.js </code>
- In another terminal, <code> redis-server </code> on default port.
- Open your web browser and <code> localhost:5000/stream/\<mysecretKey\> </code>. Replace \<mysecretKey\> with key of your own. You'll receive \<streamkey\>
- In your OBS, go to settings -> Stream. Set service to custom and server to "rtmp://localhost:1935/live" without quotes.
  - In streamkey, put it in format <code> \<streamkey\>?id=\<mysecretKey\> </code>. \<mysecretKey\> is the key you used to generate streamkey in previous step.
- Start streaming on OBS  
- To see all streams available, go to <code>localhost:5000 </code> 

## NOTE
All the urls are hardcoded for now.
You can monitor your stream in <code> localhost:8000/admin </code>
