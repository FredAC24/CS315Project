#!/bin/bash
YELLOW=$(tput setaf 3)
NORMAL=$(tput sgr0)

printf "\n%40s\n" "${YELLOW}Starting Local API${NORMAL}"
cd ./api
node ./index.js