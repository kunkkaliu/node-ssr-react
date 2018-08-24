#!/usr/bin/env bash
#!/bin/bash
set -e

PROJECT_NAME="node_ssr_react"
DEV_HOSTS="g1-am-test-v03"
SERVICE_PATH="/data/www/am/$PROJECT_NAME"


build() {
	echo "building $PROJECT_NAME..."
	sudo chmod -R 755 /var/lib/jenkins/workspace
	sudo chown -R vip:vip /var/lib/jenkins/workspace
	yarn && npm run build_dev
}

move() {
    echo "move $PROJECT_NAME..."
	if [ ! -d "$SERVICE_PATH" ];
	then
        sudo mkdir -p $SERVICE_PATH
    fi
    sudo rm -rf $SERVICE_PATH/*
	sudo mv dist/* $SERVICE_PATH/
	sudo chown -R vip:vip $SERVICE_PATH/
    sudo chmod 755 -R $SERVICE_PATH/
}

deploy() {
    echo "deploy $PROJECT_NAME..."
    for host in $DEV_HOSTS
    do
        echo ">>>>>>start deploy to $host;"
        ssh $host "sudo supervisorctl stop $PROJECT_NAME"
        echo "stopped $host finished"
        if [ -d $host:$SERVICE_PATH ]; then
            echo "deploy dir is exists, do not need to make"
        else
            ssh $host "sudo mkdir -p $SERVICE_PATH && sudo chown vip:vip $SERVICE_PATH";
        fi
        rsync -va $SERVICE_PATH/ $host:$SERVICE_PATH;
        ssh $host "sudo supervisorctl start $PROJECT_NAME"
        echo "deploy $host finished, sleeping 3 seconds before deploy to the other host..."
        sleep 3
    done
}

do_deploy() {
    build
    move
    deploy
}

echo "Usage: " $(basename $0) "deploy"

eval do_$1