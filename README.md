Communicare
Before running, install:
- Node.js
- npm
- MariaDB

Verify Node.js and npm are installed
- node -v
- npm -v

Installation:

Clone repository:
git clone https://github.com/grapwnsXIV/communicare.git
cd communicare

Install Frontend
cd client
npm install
cd ..

Install Backend
cd server
npm install
cd ..

Start backend
 cd server
 npm run dev
The express backend should run at http://localhost:4000

verify running: curl http://localhost:4000/api/health

Start frontend
 cd communicare/client
 npm run dev
Vite starts at http://localhost:5173
if occupied it may be 5147

API Endpoints
GET - /api/health - Check backend status
GET - /api/symptoms - Retrieve symptom reports
POST - /api/symptoms - Submit a new symptom report

Testing
Backend Health Check: curl -i http://localhost:4000/api/health
Expected result: HTTP 200 OK.

Retrieve Symptom Reports: curl -i http://localhost:4000/api/symptoms
Expected result: HTTP 200 OK and JSON array.

Submit Test Report:
  curl -i -X POST http://localhost:4000/api/symptoms \
  -H "Content-Type: application/json" \
  -d '{"bodyPart":"head","symptomType":"aching","severity":"moderate"}'
Expected result: HTTP 201 Created with saved report ID and timestamp.

Test Input Validation:
  curl -i -X POST http://localhost:4000/api/symptoms \
  -H "Content-Type: application/json" \
  -d '{"severity":"mild"}'
Expected result: HTTP 400 Bad Request, fields missing.

Test Frontend:
  cd client
  npm run build
Successful build confirms frontend compiles without build-time errors.

Database Setup (MariaDB)
Install MariaDB:

ARCH LINUX: sudo pacman -S mariadb
for new installation, initialize database directory: sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
verify: systemctl status mariadb
sudo systemctl enable --now mariadb

UBUNTU/DEBIAN/LINUX MINT:
sudo apt update
sudo apt install mariadb-server mariadb-client
verify: sudo systemctl status mariadb
sudo systemctl enable --now mariadb

For Linux, open MariaDB in terminal
sudo mariadb

macOS: brew install mariadb
verify:
mariadb --version
brew services list
brew services start mariadb

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

GRANT UPDATE (status)
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

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=communicare_app
DB_PASSWORD=YOUR_LOCAL_DATABASE_PASSWORD
DB_NAME=communicare

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


Phase 1 Feedback and Improvements
Feedback received:
"AI-suggested diagnoses carry real risk, so frame the AI as summarizing symptoms for the clinician and give it a defined tool (for example, saving a structured symptom record or looking up a symptom reference)."

Changes implemented:
Went for the AI summzrizing symptoms idea.

AI Integration (Planned)
Communicare plans to incorporate AI-generated symptom summaries to assist with presenting symptom information.
It will operate through the backend rather than calling the AI provider directly from React.
1. Patient submits symptom report.
2. Express validates and saves the report to MariaDB.
3. Authorized backend operation retrieves the symptom information.
4. Backend sends approved test data to configured AI provider.
5. AI service generates summary.
6. Backend returns summary to interface.
AI provider: Groq (from class)
API key storage: Backend environment variables. Must not be exposed in frontend source code or GitHub commit.
Planned tool calling: AI agent may use authorized backend tools to retrieve reports and report information. Must be restricted.
Proposed tool: get_symptom_report
Retrieve structured symptom report from backend using report ID. The tool would return report's body part, symptom type, severity, status, and submission timestamp after validating permissions.
AI service will use information to generates summary for clinicians.
Current implementation status: AI summarization and tool calling remain planned features.
Patient symptom-reporting workflow, Express API, and MariaDB have been implemented and tested.
Database layer supports individual report retrieval, report status updates, filtering, pagination, and report counting.
AI summary service and tool-calling functionality are planned for Phase 3.