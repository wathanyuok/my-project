require("dotenv").config();
const express = require("express");
const cors = require('cors');

const postRoute = require("./routes/post-routes");
const userRoute = require("./routes/user-routes");
const authRoute = require("./routes/auth-routes");
const labRoute = require("./routes/lab-routes");
const errorHandler = require("./middlewares/error");
const notfoundHandler = require("./middlewares/notfound");
const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/todos", labRoute);

app.use(errorHandler);
app.use(notfoundHandler);
// Start serve
app.listen(8080, () => console.log("Server is running on port 8080"));