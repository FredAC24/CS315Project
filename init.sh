#!/bin/bash
YELLOW=$(tput setaf 3)
NORMAL=$(tput sgr0)
printf ""
printf "\n%40s\n" "${YELLOW}Creating Database${NORMAL}"
dropdb proj
createdb proj
printf "\n%40s\n" "${YELLOW}Populating Database${NORMAL}"
psql -d proj -f create_data.sql
printf "\n%40s\n" "${YELLOW}Installing API Dependencies${NORMAL}"
cd ./api
npm i
printf "\n%40s\n" "${YELLOW}Installing Website Dependencies${NORMAL}"
cd ../website
npm i
printf "\n%40s\n" "${YELLOW}Installing Angular CLI${NORMAL}"
sudo npm install -g @angular/cli
printf "\n%40s\n" "${YELLOW}Finished! Run start_api.sh and start_web.sh to run the api and webserver.${NORMAL}"