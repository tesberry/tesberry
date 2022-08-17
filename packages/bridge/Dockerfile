FROM python

RUN apt update && apt install -y net-tools iproute2

COPY . .

RUN ./setup.sh

ENTRYPOINT [ "python", "index.py" ]
