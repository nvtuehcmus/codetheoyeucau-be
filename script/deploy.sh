#!/bin/bash

LOCAL_DIR='build/'
ADDRESS="3.0.202.33"
USER="ubuntu"
TARGET_DIR='www/api.codetheoyeucau.com'

GREEN="\033[0;32m"
RED="\033[0;31m"
RESET="\033[0m"


echo -e "${RED}Removing old build...${RESET}"
rm -rf /build

echo -e "${GREEN}Start building...${RESET}"
if ! yarn build ; then
    echo -e "${RED}Build failed. Exiting deployment script.${RESET}"
    exit 1
fi


rsync -zaP -a  ${LOCAL_DIR} ${USER}@${ADDRESS}:${TARGET_DIR}
rsync -zaP  package.json ${USER}@${ADDRESS}:${TARGET_DIR}

ssh ${USER}@${ADDRESS} 'bash -s' <<'ENDSSH'
  cd www/api.codetheoyeucau.com
  echo -e '\033[0;32mInstalling dependencies... \033[0m'
  npm install

  echo -e '\033[0;32mRestarting server...'
  export NODE_ENV=production && pm2 restart --update-env  app/rest/index.js

ENDSSH


