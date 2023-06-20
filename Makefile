

local-run:
	python backend/main.py&
	cd frontend && npm start

backend-run: 
	python backend/main.py

frontend-run:
	cd frontend && npm start


