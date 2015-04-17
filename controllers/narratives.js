var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models');


router.get("/search", function(req, res) {
  console.log("Awesome")
  var query = '%'+req.query.q+'%'
  db.map.findAll({
    where:{
      $or:{
        city: {$iLike: query},
        mapName: {$iLike: query}
      }
    }
  }).then(function(map){
    var locals = {map: map}
    res.render("narratives/search", locals)
  })
})


router.get("/usermaps", function(req, res) {
   db.user.find({
    where:{id:req.getUser().id},
    include:[db.map]
  }).then(function(map){
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

router.delete('/:id',function(req,res){
    if (req.getUser()) {
    db.map.destroy({where: {id: req.params.id}}).then(function(){
        res.send({result: true})
    });
    }else{
      req.flash('danger','You cannot delete this map.');
      res.redirect('/');
    }
})






// "narratives/journals"

module.exports = router;