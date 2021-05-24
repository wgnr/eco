#!/bin/bash
echo 'Start docker-compose'
# docker-compose --detach up

echo 'Installing node dependencies...'
# npm i

echo 'Ensure building dist'
# npm run build

echo 'remove provous PM2 process'
npx pm2 delete all

SERVER_PORT=3000
ENDPOINT_URL="http://localhost:$SERVER_PORT/api/info"
WORKDIR="./stressTesting"

echo "Create folder for testing..."
mkdir -p $WORKDIR

# echo "==============================================="
# echo "Start 1 === with  --prof"
# echo "Serve server in fork mode"
# npx pm2 start ./dist/index.js --node-args="--prof" --name="1-server_fork_no_consolelog" -- --mode FORK --port $SERVER_PORT --prevent-console-logger

# echo "Run Artillery on server_fork_no_consolelog"
# npx artillery quick -c 50 -n 20 $ENDPOINT_URL > $WORKDIR/1-server_fork_no_consolelog_artillery.txt

# echo "Run Autocannon on server_fork_no_consolelog"
# npx autocannon -d 20 -c 100 $ENDPOINT_URL
# read -p "Write down the Autocannon result and press any key to continue ..."

# echo "Close server server_fork_no_consolelog"
# npx pm2 delete 0

# echo "Analize data on server_fork_no_consolelog"
# OUTPUTFILE_NO_FORK=`ls | grep isolate*.log`
# node.exe --prof-process $OUTPUTFILE_NO_FORK > $WORKDIR/1-server_fork_no_consolelog_profiling.txt
# rm $OUTPUTFILE_NO_FORK


# echo "Serve server in fork mode"
# npx pm2 start ./dist/index.js --node-args="--prof" --name="1-server_fork_with_consolelog" -- --mode FORK --port $SERVER_PORT --prevent-console-logger --add-consolelog-info

# echo "Run Artillery on server_fork_with_consolelog"
# npx artillery quick -c 50 -n 20 $ENDPOINT_URL > $WORKDIR/1-server_fork_with_consolelog_artillery.txt

# echo "Run Autocannon on server_fork_with_consolelog"
# npx autocannon -d 20 -c 100 $ENDPOINT_URL
# read -p "Write down the Autocannon result and press any key to continue ..."

# echo "Close server server_fork_with_consolelog"
# npx pm2 delete 0

# echo "Analize data on server_fork_with_consolelog"
# OUTPUTFILE_NO_FORK=`ls | grep isolate*.log`
# node.exe --prof-process $OUTPUTFILE_NO_FORK > $WORKDIR/1-server_fork_with_consolelog_profiling.txt
# rm $OUTPUTFILE_NO_FORK



echo "==============================================="
echo "Start 2 === with  --inspect"
echo "Serve server in fork mode"
npx pm2 start ./dist/index.js --node-args="--inspect" --name="2-server_fork_no_consolelog" -- --mode FORK --port $SERVER_PORT --prevent-console-logger
read -p "Connect to chrome://inspect, start recording and press enter..."
npx artillery quick -c 50 -n 20 $ENDPOINT_URL
npx autocannon -d 20 -c 100 $ENDPOINT_URL
read -p "Write down the Autocannon result and press any key to continue ..."
echo "Close server server_fork_with_consolelog"
npx pm2 delete 0

echo "Serve server in fork mode"
npx pm2 start ./dist/index.js --node-args="--inspect" --name="2-server_fork_with_consolelog" -- --mode FORK --port $SERVER_PORT --prevent-console-logger --add-consolelog-info
read -p "Connect to chrome://inspect, start recording and press enter..."
npx artillery quick -c 50 -n 20 $ENDPOINT_URL
npx autocannon -d 20 -c 100 $ENDPOINT_URL
read -p "Write down the Autocannon result and press any key to continue ..."
echo "Close server server_fork_with_consolelog"
npx pm2 delete 0