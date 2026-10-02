.PHONY: backend frontend server

backend:
	cd backend && poetry run python3 manage.py runserver

frontend:
	cd frontend && bun run dev

migrations:
	cd backend && poetry run python3 manage.py makemigrations

migrate:
	cd backend && poetry run python3 manage.py migrate

createsuperuser:
	cd backend && poetry run python3 manage.py createsuperuser

server:
	osascript -e 'tell application "Terminal" to do script "cd \"$(PWD)/backend\" && poetry run python3 manage.py runserver"' \
	-e 'tell application "Terminal" to do script "cd \"$(PWD)/frontend\" && bun run dev"'