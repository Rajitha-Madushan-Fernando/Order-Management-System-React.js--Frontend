cd Order-Management-System-React.js--Frontend

echo "**********************************************  Git reset "
git reset --hard

echo "**********************************************  Git get update "
git pull origin master

echo "**********************************************  Start Build the project"
yarn build

echo "**********************************************  Build Completed " 

echo "**********************************************  Start file copying in /var/www/html/ !"
sudo cp -R build/* /var/www/html/

echo "**********************************************  File trafer completed to the server folder "