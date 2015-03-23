cd /home/app
git clone https://github.com/hdemon/hdemon.git
cd ./hdemon
git pull origin master
npm install
node ./dist/server/index.js
