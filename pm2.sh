#!/bin/bash
echo 'Installing node dependencies...'
# npm i

echo 'Ensure building dist'
npm run build

echo 'remove provous PM2 process'
npx pm2 delete all

echo "serve fork"
npx pm2 start ./dist/index.js --name="server_fork" --watch ./dist/ -- --port 8081 --mode FORK

echo "serve cluster"
npx pm2 start ./dist/index.js --name="server_cluster" --watch ./dist/ -- --port 8082 --mode CLUSTER