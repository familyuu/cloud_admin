#!/bin/bash
# For node.js ececute system cmd on remote host
CMD='cat /root/localrc'
sshpass -p 'password' ssh $1@$2 $CMD