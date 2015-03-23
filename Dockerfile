FROM ubuntu

MAINTAINER Masami Yonehara(zeitdiebe@gmail.com)

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/ruby/bin:/home/app/.rbenv/bin:/home/app/.rbenv/shims:/home/app/.rbenv/plugins
ENV RBENV_ROOT /home/app/.rbenv

RUN apt-get update -y
# see https://github.com/dotcloud/docker/issues/1724
RUN apt-mark hold initscripts
RUN apt-get upgrade -y

RUN apt-get install -y \
  sudo \
  git \
  net-tools \
  gcc \
  g++ \
  openssl \
  make \
  bzip2 \
  autoconf \
  automake \
  libtool \
  bison \
  build-essential \
  software-properties-common

# install nodejs
RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# create app user
RUN adduser --disabled-password --gecos "" app \
  && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
  && echo 'app:ppa' | chpasswd

RUN su app
ADD ./start.sh /home/app/

ENV GITHUB_USER_NAME=hdemon
CMD /home/app/start.sh
