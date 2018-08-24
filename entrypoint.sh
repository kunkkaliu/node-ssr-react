#!/bin/sh
set -e
log_dir=/var/log/k8s/$HOSTNAME
mkdir $log_dir && ln -sf $log_dir /data/www/node_ssr_react/log
exec "$@"

nginx -g "daemon off;"
