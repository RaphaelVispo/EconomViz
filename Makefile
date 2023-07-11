

local-run:
	python backend/main.py&
	cd frontend && npm start

backend-run: 
	python backend/main.py

frontend-run:
	cd frontend && npm start

docker-run:
	docker build -t economviz:backend -f backend/Dockerfile.dev ./backend  
	docker build -t economviz:frontend -f frontend/Dockerfile.dev ./frontend

	docker run -d -p 5000:5000 economviz:backend
	docker run -d -p 3000:3000 economviz:frontend 
