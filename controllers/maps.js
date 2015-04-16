var express = require('express')

var router = express.Router();

var request = require('request');

var db = require('../models')


router.get("/", function(req, res) {
    db.map.findAll().then(function(map) {
    var locals = {mapList: map}
    console.log(locals.mapList[1])
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
  db.map.find({
    where:{id:localId},
    include:[db.location]
  }).then(function(map){
    console.log(map)
    res.render("maps/locations", {map: map, localId: req.params.id});
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
      res.redirect('/');
    }
});



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

router.post('/delete/:id',function(req,res){
    db.map.destroy({where: {id: req.params.id}}).then(function(){
        res.redirect("/narratives/usermaps")
    });
})

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