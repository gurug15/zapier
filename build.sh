#!/bin/bash

docker build -t guru15/zapier:frontend ./frontend/.
docker build -t guru15/zapier:hooks    ./hooks/.
docker build -t guru15/zapier:backend  ./primary-backend/.
docker build -t guru15/zapier:processor ./processor/.
docker build -t guru15/zapier:worker ./worker/.
