const express = require("express");

const listednfts = require("./listednfts.route");
const log = require("./log.route");
const marketplace = require("./marketplace.route");
const collection = require("./collection.route");

module.exports = (app) => {
  const router = express.Router();

  router.use("/listednfts", listednfts);
  router.use("/log", log);
  router.use("/marketplace", marketplace);
  router.use("/collection", collection);
  router.get("/test", (req, res) => {
    res.status(200).send({
      status: "success",
      msg: "Welcome",
    });
  });

  app.use(router);
};
