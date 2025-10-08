#

shuli-hNode.js Final Project — Factory Server (Node.js + Express + MongoDB)

> A clean, minimal server for a factory-style website. Built with **Node.js**, **Express**, and **MongoDB**. Includes a simple MVC-ish folder layout (models → repositories → services → routers) and optional HTML pages under `client/`.

## ✨ Features

* RESTful endpoints for core entities (e.g. **Employees**, **Departments**, **Shifts**)
* Layered architecture: **models → repositories → services → routers**
* MongoDB connection via Mongoose
* Environment-based configuration (`.env`)
* Ready for local dev or cloud (MongoDB Atlas)

---

## 🧰 Tech Stack

* **Runtime:** Node.js (>= 18 recommended)
* **Framework:** Express.js
* **Database:** MongoDB (local or Atlas)
* **ODM:** Mongoose
* **Dev Tools:** Nodemon (optional), VS Code

---

## 📁 Project Structure

```
project-root/
├─ client/                 # Optional static pages / client code
├─ configs/                # App & DB config (e.g., mongoose connection)
├─ data/                   # Optional JSON samples (can be imported to DB)
├─ models/                 # Mongoose schemas & models
├─ repositories/           # DB access layer (CRUD on models)
├─ services/               # Business logic
├─ routers/                # Express routers per resource
├─ index.js                # App entry point (creates Express app)
├─ package.json
├─ package-lock.json
└─ .gitignore              # node_modules, env files, builds are ignored
```

---

## 🚀 Getting Started

### 1) Prerequisites

* **Node.js** ≥ 18 (LTS recommended)
* **MongoDB** running locally (e.g., `mongodb://127.0.0.1:27017`) or **MongoDB Atlas** connection string

### 2) Installation

```bash
# clone (or download) this repo, then:
npm ci   # or: npm install
```

### 3) Environment Variables

Create a file named **`.env`** in the project root (same folder as `package.json`).
You can base it on this example:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/factory
# If you use Atlas, something like:
# MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
```

> Tip: Consider committing an example file named **`.env.example`** (same keys, no secrets) so collaborators know what to set.

### 4) Run the Server

```bash
# Development (if script exists)
npm run dev

# or Production / plain Node
npm start
# or
node index.js
```

You should see a log indicating the server is listening (e.g., `Server is running on port 3000`) and that MongoDB is connected.

---

## 🧪 Quick Health Check

Add this route (if you don’t already have one) to quickly verify the server is up:

```js
// in index.js (or a dedicated health router)
app.get('/health', (req, res) => res.json({ ok: true }));
```

Then open: `http://localhost:3000/health` → expect `{ ok: true }`.

---

## 📚 API (Examples)

> Replace these with your real endpoints if they differ.

### Employees

* `GET /api/employees` — list all employees
* `GET /api/employees/:id` — get single employee
* `POST /api/employees` — create employee
* `PUT /api/employees/:id` — update employee
* `DELETE /api/employees/:id` — delete employee

### Departments

* `GET /api/departments`
* `GET /api/departments/:id`
* `POST /api/departments`
* `PUT /api/departments/:id`
* `DELETE /api/departments/:id`

### Shifts *(if implemented)*

* `GET /api/shifts`
* `POST /api/shifts`
* `PUT /api/shifts/:id`

> Use a tool such as **Postman**, **Insomnia**, or simple `curl` commands to exercise the endpoints.

---

## 🗃️ Seed / Sample Data (Optional)

If you have JSON files under `data/`, you can import them with `mongoimport`. Example:

```bash
mongoimport \
  --uri "mongodb://127.0.0.1:27017/factory" \
  --collection employees \
  --file data/employees.json \
  --jsonArray
```

Repeat for other collections as needed (`departments`, `shifts`, …).

---

## 🧪 Scripts (from `package.json`)

Common examples (update according to your `package.json`):

```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

Run with `npm run <script>`.

---

## 🔐 Notes & Good Practices

* Never commit real `.env` secrets — add `.env` to `.gitignore` (already present).
* Keep `node_modules/` out of Git; reinstall with `npm ci` on fresh clones.
* Use **try/catch** or error-handling middleware in routers/services.
* Validate incoming data (e.g., `Joi`, `zod`, or Mongoose validation).
* Return consistent JSON responses and HTTP status codes.

---

## 🛠 Troubleshooting

* **Cannot connect to MongoDB** → Check `MONGODB_URI`, ensure MongoDB is running and credentials/whitelisting are correct.
* **Port already in use** → Change `PORT` in `.env` or free the port.
* **Windows CRLF warnings** → Optional: add `.gitattributes` with `* text=auto eol=lf` and commit.

---


## 👤 Author

Shuli Hatuca 
