# Google Calendar Event Manager

A simple application for viewing, creating, editing, and deleting events in Google Calendar, with an audit trail for each action recorded in a database.

## Tech Stack

**Client:** React, TypeScript, MUI Material

**Server:** Node, Express, TypeScript,

**Database:** PostgreSQL, Sequelize

**Docker** is used for running local PostgreSQL instance

## Run Locally

Clone the project

```bash
  git clone git@github.com:bbj26/google-calendar-event-manager.git
```

Go to the project directory

```bash
  cd google-calendar-event-manager
```

#### Server

Install server dependencies

```bash
    cd server
    npm install
```

Create `.env.development` file in `server` folder and put your environment variables needed for server app to run in there. You can see server's `.env.template` for reference:

```bash
CLIENT_ID=googleclientidgoeshere
CLIENT_SECRET=googleclientsecretgoeshere
REDIRECT_URL=http://localhost:8000/google/redirect
CLIENT_APP_URL=http://localhost:3000
SERVER_DOMAIN=localhost

# Database
DATABASE_HOST=localhost
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_PORT=5433
DATABASE_SCHEMA=public
DATABASE_DIALECT=postgres
DATABASE_NAME=db_calendar_manager
```

Start postgres database container from root project directory

```
cd ..
docker-compose --env-file server/.env.development -f postgres-db-compose.yml up -d
```

Start the server

```bash
    cd server
    npm run dev
```

#### Client

Install client dependencies

```bash
    cd client
    npm install
```

Create `.env` file in `client` folder and put your environment variables needed for server app to run in there. You can see server's `.env.template` for reference:

```
REACT_APP_GOOGLE_CLIENT_ID=abcdefghijklmnoprstqwxyz123
REACT_APP_SERVER_ENDPOINT=http://localhost:8000
REACT_APP_GOOGLE_AUTH_REDIRECT_URL=http://localhost:8000/google/redirect
```

Start the client

```
npm run start
```

---

### Creating a Google Cloud Project

Before running the project, you need to create a new project in the Google Developers Console to obtain the `client_id` and `client_secret`.

Go to the [Google Developers Console](https://console.developers.google.com/project).

Click on the project drop-down and select "New Project".

Enter a name for your project and click "Create".

Navigate to the "OAuth consent screen" tab, configure your consent screen, and save.

Go to the "Credentials" tab and click "Create Credentials".
Select "OAuth 2.0 Client IDs" and configure the OAuth consent screen.

Set the "Authorized redirect URIs" to http://localhost:8000/google/redirect.

Copy the client_id and client_secret to use in your .env.development file.

For detailed instructions, you can refer to the official Google documentation.
