#!/bin/bash
# For node.js ececute system cmd on remote host
CMD='ls'
sshpass -p 'password' ssh $1@$2 $CMD