# Vector Search with PostgreSQL in Node.js

This project implements vector search functionality using PostgreSQL and Node.js. It uses the `pgvector` extension for PostgreSQL to enable efficient vector similarity search.

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v16 or higher)
- pgvector extension for PostgreSQL

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SantoshShresthaa/semantic-search-with-postgres-and-node-express.git
cd semantic-search-with-postgres-and-node-express
```

2. Install dependencies:
```bash
yarn install
```

3. Install PostgreSQL:
   - For macOS (using Homebrew):
   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   ```
   - For Ubuntu/Debian:
   ```bash
   sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   sudo apt-get update
   sudo apt-get install postgresql-16
   ```

4. Install pgvector:
   - For macOS:
   ```bash
   brew install pgvector
   ```
   - For Ubuntu/Debian:
   ```bash
   sudo apt-get install postgresql-16-pgvector
   ```

5. Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

## Database Setup

1. Create your database:
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE your_database_name;
```

2. Run migrations:
```bash
# This will automatically:
# - Enable the vector extension
# - Add the embedding column
# - Create the necessary index for vector similarity search
yarn migrate
```

## Running the Application

Development mode:
```bash
yarn dev
```

Production mode:
```bash
yarn start
```

## Available Scripts

- `yarn start`: Start the application in production mode
- `yarn dev`: Start the application in development mode with hot reload
- `yarn migrate`: Run database migrations
- `yarn migrate:undo`: Undo the last migration
- `yarn migrate:undo:all`: Undo all migrations

## Project Structure

```
├── src/                    # Source code directory
│   ├── config/            # Configuration files
│   ├── Controllers/       # Route controllers
│   ├── helpers/           # Helper functions
│   ├── migrations/        # Database migrations
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── seeders/           # Database seeders
│   └── app.js             # Express application setup
├── server.js              # Main application entry point
├── .sequelizerc           # Sequelize configuration
├── package.json           # Project dependencies and scripts
├── yarn.lock              # Yarn lock file
├── .gitignore            # Git ignore file
└── sample-data.json      # Sample data for testing
```

## Dependencies

- express: Web framework
- pg: PostgreSQL client
- pgvector: Vector operations for PostgreSQL
- sequelize: ORM for database operations
- dotenv: Environment variable management
- axios: HTTP client

## Development Dependencies

- nodemon: Development server with hot reload
- sequelize-cli: Database migration tools

## License

MIT

## Author

Santosh Shrestha 