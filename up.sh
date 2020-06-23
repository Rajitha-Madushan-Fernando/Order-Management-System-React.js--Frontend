cd Order-Management-System-React.js--Frontend

echo "**********************************************  Git reset "
git reset --hard

echo "**********************************************  Git get update "
git pull origin master

echo "**********************************************  Build the project"
yarn build

echo "**********************************************  Build Completed "
echo "Build is completed "

echo "**********************************************  Start file copying !"
sudo cp -R build/* /var/www/html/

echo "**********************************************  File trafer completed to the server folder"