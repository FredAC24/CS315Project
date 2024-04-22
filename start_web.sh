#!/bin/bash
YELLOW=$(tput setaf 3)
NORMAL=$(tput sgr0)

printf "\n%40s\n" "${YELLOW}Starting Local Webserver${NORMAL}"
cd ./website
ng serve --build-target=csc315-proj-website:build:production --open --live-reload=false