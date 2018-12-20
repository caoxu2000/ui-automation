#!/bin/sh

echo '-- start of wdio --'
ls -al
whoami
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
source ~/.profile
nvm install node
npm install
npm run qa
