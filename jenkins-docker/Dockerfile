FROM jenkins/jnlp-slave:3.10-1

USER root

RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs \
		vim \
		git \
		g++ build-essential

USER jenkins

ENTRYPOINT ["jenkins-slave"]
