var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')


// Render site explore/homepage
router.get("/", function(req, res) {
    db.map.findAll().then(function(map) {
    var locals = {mapList: map}
      res.render("maps/explore", locals);
    })
});


// Render map creation page, only open to logged in users
router.get("/create", function(req, res) {
  if (req.getUser()) {
    res.render("maps/create")
  } else {
    req.flash('danger','You must be logged in to create a map.');
    res.redirect("/maps")
    }
  });


// Render about page
router.get("/about", function(req, res) {
    res.render("maps/about")
    });


// Render edit page, only available to logged in users
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


// Get add locations page, accessible from create map page
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


// Create a new map, only accessible to logged in users
router.post("/", function(req, res) {
    var user = req.getUser();
    if(user){
      if (req.body.mapName != "" && req.body.city != "") {
      db.map.findOrCreate({where: {mapName: req.body.mapName, city: req.body.city, country: req.body.country,
        description: req.body.description, userId: user.id}}).spread(function(map, created) {
          map.save().then(function() {
            res.redirect("maps/locations/" + map.id)
        })
      });
      } else {
        req.flash('danger','Please enter a map name and a city.')
        res.redirect('/maps/create')
      }
    } else{
      req.flash('danger','You must be logged in to create a map.');
      res.redirect('/');
    }
});


// Add locations to user map
router.post("/locations/:id", function(req, res) {
  if (req.getUser()) {
    if (req.body.locationName != "" && req.body.city != "") {
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
      } else {
        req.flash('danger','Please enter a location name and city.');
        res.redirect("/maps/locations/" + req.params.id);
      }
   }else{
      req.flash('danger','You must be logged in to create a map.');
      res.redirect('/');
    }
  });


// Edit user maps,  only available to logged in users
router.post('/edit/:id', function(req, res) {
  if (req.body.mapName != "" || req.body.description != "") {
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
  } else {
        req.flash('danger','Enter a new map name or description.')
        res.redirect('/maps/edit/' + req.params.id)
    }
})



// Delete maps, only available to logged in users, uses AJAX
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