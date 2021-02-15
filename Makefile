build:
	docker-compose build

rerun:
	docker-compose down
	sudo rm -fr node_modules package-lock.json mysql
	echo "Build in the application"
	docker-compose up -d
	echo "waiting 15s for installing the dependencies in server"
	docker-compose exec server npm install
	sleep 15s
	echo "creating the database"
	docker-compose exec server npx sequelize db:migrate 
	echo "inserting dumping data in database"
	docker-compose exec server npx sequelize db:seed:all