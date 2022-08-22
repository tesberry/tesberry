FROM python

RUN apt update && apt install -y ffmpeg

COPY . .

RUN pip install -r requirements.txt && ./downloadassets.sh

ENTRYPOINT [ "python", "teslabox.py" ]
