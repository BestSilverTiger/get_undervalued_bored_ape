require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { CronJob } = require("cron");

const { getListedNFTs } = require("./utils/boredapeyc");
const { dbInfo } = require("./config");

const routes = require("./routes");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Sever is running!");
});

routes(app);

mongoose
  .connect(dbInfo.url)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is started at:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const cronJob = new CronJob("0 0 */1 * * *", async () => {
  getListedNFTs();
});

if (!cronJob.running) {
  cronJob.start();
}
