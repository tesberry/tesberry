FROM python

COPY . .

RUN pip install -r requirements.txt && ./downloadassets.sh

ENTRYPOINT [ "python", "teslabox.py" ]
