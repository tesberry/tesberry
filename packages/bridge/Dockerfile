FROM python

RUN apt-get update && apt-get install -y net-tools

COPY . .

RUN ./setup.sh

ENTRYPOINT [ "python", "index.py" ]
