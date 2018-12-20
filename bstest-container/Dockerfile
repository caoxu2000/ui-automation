FROM selenium/base:latest

USER root

RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
RUN apt-get install -y nodejs \
		vim \
		git \
		g++ build-essential

RUN useradd -ms /bin/bash jenkins
USER jenkins
WORKDIR /home/jenkins
