// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var mongoose_db_str = "mongodb://"+process.env.OPENSHIFT_MONGODB_DB_USERNAME+":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD+"@"+process.env.OPENSHIFT_MONGODB_DB_HOST+":"+process.env.OPENSHIFT_MONGODB_DB_PORT+"/"+process.env.OPENSHIFT_APP_NAME

//DB Setup
mongoose.connect(mongoose_db_str); // connect to our database

var Member     = require('./app/models/member');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();     // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /members
// ----------------------------------------------------
router.route('/members')

    // create a member (accessed at POST http://localhost:8080/api/members)
    .post(function(req, res) {
        
        var member = new Member();      // create a new instance of the Bear model
        member.firstname = req.body.firstname;  // set the members name (comes from the request)
        member.lastname = req.body.lastname;
        member.date_of_birth = req.body.date_of_birth;
        member.gender = req.body.gender;
        member.street = req.body.street;
        member.number = req.body.number;
        member.zip_code = req.body.zip_code;
        member.town = req.body.town;
        member.country = req.body.country;
        member.email1 = req.body.email1;
        member.email2 = req.body.email2;
        member.mobile = req.body.mobile;
        member.tel1 = req.body.tel1;
        member.tel2 = req.body.tel2;
        member.scuba_license = req.body.scuba_license;
        member.registration = req.body.registration;
        member.membership_paid = req.body.membership_paid;
        member.membership_contribution = req.body.membership_contribution;
		member.authorization = req.body.authorization;
		member.password = req.body.password;

        // save the member and check for errors
        member.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Member created!' });
        });
        
    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Member.find(function(err, members) {
            if (err)
                res.send(err);

            res.json(members);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
console.log('Magic happens on port ' + port);