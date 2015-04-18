var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')


router.get("/", function(req, res) {
    db.map.findAll().then(function(map) {
    var locals = {mapList: map}
    // console.log(locals.mapList[1])
      res.render("maps/explore", locals);
    })
});


router.get("/create", function(req, res) {
  if (req.getUser()) {
    res.render("maps/create")
  } else {
    req.flash('danger','You must be logged in to create a map.');
    res.redirect("/maps")
    }
  });


router.get("/about", function(req, res) {
    res.render("maps/about")
    });


router.get("/edit/:id", function(req, res) {
  if (req.getUser()) {
    var localId = parseInt(req.params.id);
     db.map.find({
      where:{id:localId},
      include:[db.location]
  }).then(function(map){
    console.log(map)
    res.render("maps/edit", {map: map, localId: req.params.id});
  })
  } else {
    req.flash('danger','You must be logged in to edit a map.');
    res.redirect("/maps")
    }
  });


router.get("/locations/:id", function(req, res) {
if (req.getUser()) {
var localId = parseInt(req.params.id);
  db.map.find({
    where:{id:localId},
    include:[db.location]
  }).then(function(map){
    console.log(map)
    res.render("maps/locations", {map: map, localId: req.params.id});
  });
  } else {
    req.flash('danger','You must be logged in to edit a map.');
    res.redirect("/maps")
    }
});


router.post("/", function(req, res) {
    var user = req.getUser();
    if(user){
      db.map.findOrCreate({where: {mapName: req.body.mapName, city: req.body.city, country: req.body.country,
        description: req.body.description, userId: user.id}}).spread(function(map, created) {
          map.save().then(function() {
            res.redirect("maps/locations/" + map.id)
        });
      });
    } else{
      req.flash('danger','You must be logged in to create a map.');
      res.redirect('/');
    }
});



router.post("/locations/:id", function(req, res) {
  if (req.getUser()) {
  var id = req.params.id
    db.map.find({where: {id: id}}).then(function(map) {
      map.createLocation({
        locationName: req.body.locationName,
        streetAddress: req.body.streetAddress, city: req.body.city, country: req.body.country,
        locationDescription: req.body.locationDescription
      }).then(function(location) {
          res.redirect("/maps/locations/" + id)
      });
    });
   }else{
      req.flash('danger','You must be logged in to create a map.');
      res.redirect('/');
    }
  });


router.post('/edit/:id', function(req, res) {
  db.map.find({ where: { id: req.params.id} }).then(function(map){
    console.log(map.dataValues)
    console.log(map.mapName)
    console.log(req.body.mapName)
      map.mapName = req.body.mapName
      map.description = req.body.description
      map.save().then(function() {
    res.redirect("/maps/locations/" + req.params.id)
  });
  });
})


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





module.exports = router;