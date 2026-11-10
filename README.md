Communicare
Before running, install:
- Node.js
- npm

Verify Node.js and npm are installed
- node -v
- npm -v

Start backend
 cd communicare/server
 npm run dev
The express backend should run at http://localhost:4000

Start frontend
 cd communicare/client
 npm run dev
Vite starts at http://localhost:5173
if occupied it may be 5147


Database Setup (MariaDB)
Install MariaDB:

ARCH LINUX: sudo pacman -S mariadb
for new installation, initialize database directory: sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
verify: systemctl status mariadb

UBUNTU/DEBIAN/LINUX MINT:
sudo apt update
sudo apt install mariadb-server mariadb-client
verify: sudo systemctl status mariadb

For Linux, open MariaDB in terminal
sudo mariadb

macOS: brew install mariadb
verify:
mariadb --version
brew services list

On macOS with homebrew: mariadb

Windows
1.Visit the official MariaDB download page: https://mariadb.org/download/
2.Download the 64-bit Windows MSI installer.
3.Run the installer and accept the license agreement.
4.Select the database server components.
5.Create a secure password for the MariaDB root account.
6.Choose to install MariaDB as a Windows service.
7.Keep the default TCP port of 3306 unless it is already occupied.
8.Complete the installation.

On Windows, connect using the administrative account and the password configured during installation:
mariadb -u root -p




Initialize communicare database
Linux: sudo mariadb < server/database/schema.sql
macOS: mariadb < server/database/schema.sql
Windows: mariadb -u root -p

Then execute the schema using an absolute path:

SOURCE C:/path/to/communicare/server/database/schema.sql;

Replace the example path with the actual location of the repository.

The SQL file creates the following:

-communicare database

-symptom_reports table

-Auto-generated report IDs

-Required symptom fields

-Severity options: mild, moderate, severe

-Automatic creation timestamps

The schema uses IF NOT EXISTS to avoid recreating an existing database or table.

Create Database Application Account
execute:

CREATE USER IF NOT EXISTS 'communicare_app'@'127.0.0.1'
IDENTIFIED BY 'REPLACE_WITH_A_STRONG_PASSWORD';

GRANT SELECT, INSERT
ON communicare.symptom_reports
TO 'communicare_app'@'127.0.0.1';

replace example password with secure local password.
Exit the administrative console: EXIT;

Test application account:
mariadb --protocol=TCP -h 127.0.0.1 -u communicare_app -p communicare
Once connected, verify access:
SELECT * FROM symptom_reports;

Configure Backend Evniroment Variables
navigate to backend directory: cd server
Create local environment file:
cp .env.example .env

open .env and configure the placeholder password with password created in 'Create Database Application Account' step.
WARNING: NEVER COMMIT .env or actual database passwords to GitHub. The repo includes the example file to document the expected environment variables.

Install Backend Dependencies
From server directory, run: npm install
Start Express: npm run dev
Backend should start at: http://localhost:4000

Verify Database Integration
Retrieve saved symptom reports: curl -i http://localhost:4000/api/symptoms
Should return HTTP 200 OK, followed by JSON array. Empty array is normal for new database.
Submit example symptom report:
curl -i -X POST http://localhost:4000/api/symptoms \
  -H "Content-Type: application/json" \
  -d '{"bodyPart":"head","symptomType":"aching","severity":"mild"}'

Should return HTTP 201 Created, including report ID and creation timestamp.


Troubleshooting

Access denied (ERROR 1045)

Confirm that the database username, password, and host match the .env configuration. The application account in these instructions uses 127.0.0.1, not localhost.

Connection refused

Make sure MariaDB is running and listening on the expected port (3306). Check that no other database service is using that port.

Database does not exist

Reimport server/database/schema.sql using an administrative database account.

Missing environment variables

Confirm that server/.env exists and contains all five required database settings.


Security Notes

Database passwords must remain private, and the database should not be exposed to the public internet during local development.