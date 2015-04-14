var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')


router.get("/", function(req, res) {
    db.map.findAll().then(function(map) {
    var locals = {mapList: map}
    // console.log(locals.mapList[1].description)
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

router.get("/locations/:id", function(req, res) {
  var localId = parseInt(req.params.id);
  console.log(localId)
  db.map.findAll().then(function(map) {
    var locals = {mapList:map, localId:req.params.id}
    console.log(locals.localId - 1)
    console.log(locals.mapList[localId - 1].dataValues.longitude)
    res.render("maps/locations",locals)
  });
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
    }else{
      req.flash('danger','You must be logged in to create a map.');
    }
});


// router.post("/locations", function(req, res) {
//   db.location.findOrCreate({where: {locationName: req.body.locationName,
//     streetAddress: req.body.streetAddress, city: req.body.city, country: req.body.country,
//     locationDescription: req.body.locationDescription}}).spread(function(map, created) {
//       map.save().then(function() {
//         res.redirect("/maps/locations")
//     });
//   });
// });

router.post("/locations/:id", function(req, res) {
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
  });



// router.post("/", function(req, res) {
//   db.map.findOrCreate({where: {mapName: req.body.mapName, city: req.body.city,
//     country: req.body.country, description: req.body.description}}).spread(function(map, created) {
//       map.save().then(function(map) {
//         db.tag.findOrCreate({where: {tagName: req.body.tagName}}).spread(function(tag, created) {
//           map.addTag(tagName).then(function() {
//           res.redirect("maps/locations")
//         });
//       });
//     });
//   });
// });


module.exports = router;