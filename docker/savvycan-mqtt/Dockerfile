FROM python

RUN apt update && apt install -y net-tools iproute2

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT [ "python", "savvycan-mqtt.py" ]
