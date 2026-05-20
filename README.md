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
	<!-- to set up the tables for first start -->
	- seed.sql
	<!-- to generate random users for tests -->
	- migrations

## Quick start (dev)
```bash
# under the db directory
cd db
# setup tables
psql -U matcha_user -d matcha -h localhost -f db/setup.sql
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

## For Backend
### 1. import ConfigModule in app.module.ts
```bash
npm install @nestjs/config
# app.module.ts
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ...
```
### 1. db: This directory contains db.module.ts and db.provider.ts in which a new Pool containes all informations about how to connect database.
```
export const PG_POOL = 'PG_POOL'

export const databaseProviders = [
	{
		provide: PG_POOL,
		inject: [ConfigService],
		useFactory: (configService: ConfigService)=>{
			return new Pool({
				connectionString: configService.get<string>('DATABASE_URL'),
			})
		}
	}
]
```

### 2. Users module : This module contains all operation CRUD for users.
```bash
# to create a whool service for users module
nest g res users
```
- **dto** : CreateUserDto class with types of data

- **user.repository.ts** : 
	-	this file includes a **UsersRepository** class, constructor with a param pool: Pool with decorator @Inject(PG_POOL)
	-	it has also an async **createUser** method by send a query to SQL, the way and the values

- **/users/register** : register a user trough **usersRepository.createUser** with password bcrypt.hash




