"use strict";

const userHelper    = require("../lib/util/user-helper");
const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // GET route to fetch all tweets
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        console.error("Failed to fetch tweets:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(tweets);
    });
  });

  // POST route to create a new tweet
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text || req.body.text.trim().length === 0) {
      return res.status(400).json({ error: "Tweet cannot be empty" });
    }
    if (req.body.text.length > 140) {
      return res.status(400).json({ error: "Tweet exceeds 140 characters" });
    }

    const user = req.body.user || userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        console.error("Failed to save tweet:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).send();
    });
  });

  return tweetsRoutes;
};

