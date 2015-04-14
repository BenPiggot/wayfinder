var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models');

router.get("/:id", function(req, res) {
    res.render("narratives/journals")
});




module.exports = router;