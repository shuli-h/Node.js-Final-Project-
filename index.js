const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./routers/loginRouter");
const authRouter = require("./routers/authRouter");
const connectDB = require("./configs/db");
const actionRouter = require("./routers/actionRouter");
const employeeRouter = require("./routers/employeeRouter");
const departmentsRouter = require("./routers/departmentsRouter");
const shiftsRouter = require("./routers/shiftsRouter");
const userActionRouter = require("./routers/userActionRouter");

const app = express();
const PORT = 3000;

/* Middleware */
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "hG#7j@K92!a8vD3^lMx2!t@Zb6PpW1kL",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "login.html"));
});

app.get("/favicon.ico", (_req, res) => res.sendStatus(204));

/* Routers */
app.use("/api/auth", authRouter);
app.use("/api/actions", actionRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/shifts", shiftsRouter);
app.use("/api", userActionRouter);
app.use("/", loginRouter);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
