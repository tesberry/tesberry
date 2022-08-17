FROM python

ENV CHANNEL "can0"
ENV MQTT_HOST "localhost"
ENV MQTT_PORT "1883"

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT [ "python", "savvycan-mqtt.py", "-H $MQTT_HOST", "-P $MQTT_PORT", "-i $CHANNEL" ]
