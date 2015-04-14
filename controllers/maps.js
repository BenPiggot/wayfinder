var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')

router.get("/", function(req, res) {
    res.render("maps/explore")
});

router.get("/create", function(req, res) {
  if (req.getUser()) {
    res.render("maps/create")
  } else {
    res.redirect("/maps")
    }
  });

router.get("/locations/:id", function(req, res) {
  res.render("maps/locations",{localId:req.params.id})
});

router.post("/", function(req, res) {
    var user = req.getUser();
    if(user){
      db.map.findOrCreate({where: {city: req.body.city, country: req.body.country,
        description: req.body.description, userId: user.id}}).spread(function(map, created) {
          map.save().then(function() {
            res.redirect("maps/locations/" + map.id)
        });
      });
    }else{
      res.send('you must be logged in');
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