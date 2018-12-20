FROM jenkins/jnlp-slave:3.10-1

USER root
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN  apt-get update &&  apt-get install -y \
	google-chrome-stable \
  jq \
  git \ 
  vim

USER jenkins

ENTRYPOINT ["jenkins-slave"]
