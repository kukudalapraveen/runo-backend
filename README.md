- git clone https://github.com/kukudalapraveen/runo-backend.git
- npm install
- npm start

# Custom Analytics Engine

## Description

The **Custom Analytics Engine** is a backend service built using **Node.js** and **MongoDB**. It provides a logging system where API logs are stored, filtered, paginated, and archived for performance optimization. It also supports rate limiting and log archival functionality based on the timestamp of logs.

---

## Features

### 1. Logging System:

- Logs API requests including the `timestamp`, `endpoint`, `method`, and `user`.
- Data stored in the **Logs** collection.

### 2. Log Archival:

- Logs older than **30 days** are moved to an **archivedLogs** collection.
- Automatic archiving ensures the performance of the primary Logs collection.

### 3. Pagination and Filtering:

- Support for **pagination** to manage large datasets.
- Filtering logs based on:
  - Time Range (`startDate`, `endDate`)
  - Endpoint
  - User.

### 4. Rate Limiting:

- Limits requests per user to ensure service stability.
- Configurable rate limit per minute.

### 5. API Requests Postman Collections:

- API requests for adding a log(POST),analytics of user(GET),analytics summary(GET).
- Added a new request for testing rate limiting,by running with collection with Run configuration iteration greater than 100.

---

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries**:
  - `mongoose` - ODM for MongoDB
  - `express-rate-limit` - Rate limiting middleware
  - `node-cron` - Scheduled jobs for log archival
- **Version Control**: Git
- **Task Scheduler**: Cron Jobs (via `node-cron`)

---

## MONGODB Credentials

email: praveendevmail@gmail.com
password: developer@123

MongoDB Atlas URL: https://cloud.mongodb.com/v2/66aa23f6f1fb6258b0055bde

1.Click on browser collections.
2.select database with name 'runo'.
3.Next check for collections->logs,archivedLogs.
