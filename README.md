### This is an application that facilitates connections between two potential partners, covering the entire process, from registration to the final meeting. 

## Fonctions
	- users
	- navigation(slider other users)
	- search
	- chat
	- notification
	- localisation(interactive carte)
	- program a real date(add agenda)

## Tech Stack
- **Frontend**: React/Vite
- **Backend**: NestJs
- **Database**: Postgresql
- **Webserver**: Nginx
- **Real-time**: Socket.io

## Structure for Dev
### frontend
### backend
### db
	- setup.sql
	- seed.sql
	- migrations

## Quick start (dev)
```bash
# under the db directory
cd db
# setup tables
psql -U matcha_user -d matcha -f db/setup.sql
```

## env.example
- **backend/backend.env**
	1. DATABASE_URL=?
	2. JWT_SECRET=?
	   JWT_EXPIRES_IN=?
	3. PORT=?
	4. GEO_API_KEY=?

- **frontend/frontend.env**
	1. VITE_API_URL=?
	2. VITE_MAP_BOX_TOKEN=?





