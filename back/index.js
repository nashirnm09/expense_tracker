const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/mongodb");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

// dotenv.config({ path: "config.env" });
dotenv.config({ path: path.resolve(path.join(__dirname, ".env")) });

connectDb();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", require("./routers/userRoute"));
app.use("/api/v1/transaction", require("./routers/transactionRoute"));

//   FOR DEPLOYMENT
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.use(async (err, req, res, next) => {
  if (err.message === "invalid signature") {
    return next(
      res
        .status(500)
        .cookie("token", null, { expiresIn: new Date(Date.now()) })
        .json({
          message: err.message,
          stack: err.stack,
        })
    );
  }

  res.status(400).json({
    message: err.message,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port);
