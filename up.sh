cd Order-Management-System-React.js--Frontend

git reset --hard

git pull origin master

yarn build

echo "Build is completed "

sudo cp -R build/* /var/www/html/

echo "**********************************************"
echo "File trafer completed to the server folder"