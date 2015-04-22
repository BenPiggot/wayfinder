var express = require('express')
var router = express.Router();
var request = require('request');
var bcrypt = require('bcrypt');
var db = require('../models')


router.get("/", function(req, res) {
    res.render("auth/login")
});


router.get("/newuser", function(req, res) {
    res.render("auth/newuser")
});


// New user creation, with validation checks
router.post("/newuser", function(req, res) {
  db.user.findOrCreate({where: {firstName: req.body.firstName, lastName: req.body.lastName,
    password: req.body.password, email: req.body.email}}).spread(function(user, created) {
      user.save().then(function() {
          res.redirect("/auth");
    })
  }).catch(function(error){
    if (error) {
        req.flash('danger','Please enter a valid email and password.')
        res.redirect('/auth/newuser')
    }
  })
});


// User login
router.post('/',function(req,res){
    db.user.find({where:{email:req.body.email}})
    .then(function(user){
        if(user){
            //check password
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err) throw err;

                if(result){
                    //store user to session!!
                    req.session.user={
                        id:user.id,
                        email:user.email,
                        firstName:user.firstName,
                        lastName: user.lastName
                    };
                    console.log('logged in!');
                    // req.flash('success','You have been logged in.');
                    res.redirect('/maps');
                }
                else{
                    console.log('wrong password');
                    req.flash('danger','Invalid password.');
                    res.redirect('/auth');
                }
            })
        }
        else{
            console.log('no user');
            req.flash('danger','Unknown user. Please sign up.');
            res.redirect('/auth/newuser');
        }
    })

});


// User log Out
router.get('/logout',function(req,res){
   delete req.session.user;
   console.log('logged out')
   res.redirect('/')
});



module.exports = router;