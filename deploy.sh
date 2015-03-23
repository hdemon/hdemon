#!/bin/sh

docker rm -f $(docker ps | grep "hdemon-site" | awk '{print $1}')
docker run -d -p 80:5000 -t hdemon-site
