// app/models/member.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MemberSchema   = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    date_of_birth: { type: Date, required: false },
    gender: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    zip_code: { type: String, required: true },
    town: { type: String, required: true },
    country: { type: String, default: "BE", required: true},
    email1: { type: String, required: true },
    email2: { type: String, required: false },
    mobile: { type: String, required: false },
    tel1: { type: String, required: false },
    tel2: { type: String, required: false },
    scuba_license: { type: Number, required: true },
    registration: { type: Date, default: Date.now },
    membership_paid: { type: Date, required: false },
    membership_contribution: { type: Number, default: 0 , required: true},
	authorization: { type: Number, required: false },
	password: { type: String, required: false }
});

module.exports = mongoose.model('Member', MemberSchema);
