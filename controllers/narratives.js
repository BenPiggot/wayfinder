var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models');


router.get("/usermaps", function(req, res) {
   db.user.find({
    where:{id:req.getUser().id},
    include:[db.map]
  }).then(function(map){
    console.log(map.maps[0])
  res.render("narratives/usermaps", {map: map});
  })
})

router.get("/:id", function(req, res) {
  var localId = parseInt(req.params.id);
  db.map.find({
    where:{id:localId},
    include:[db.location]
  }).then(function(map){
    console.log(map)
    res.render("narratives/journals", {map: map});
  });
});





// "narratives/journals"

module.exports = router;