var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models');

router.get("/:id", function(req, res) {
  var localId = parseInt(req.params.id);
  db.map.find({
    where:{id:localId},
    include:[db.location]
  }).then(function(map){
    console.log(map.locations[0])
    res.render("narratives/journals", {map: map});
  });
});


// "narratives/journals"

module.exports = router;