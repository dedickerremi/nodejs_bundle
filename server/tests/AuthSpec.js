const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../../server');

const mongoose = require('mongoose')
const Msg = require('../constants/response')
const expect = chai.expect;
const User = require('../model/userModel')
// Configure chai
chai.use(chaiHttp);
const should = chai.should();
const TAG = "Authentication"

describe(TAG, () => {
    before(function(done) {
        console.log(TAG, "before")
         User.deleteMany({}, done);
    });

    after(function (done) {
        mongoose.disconnect();
        done();
    });

    function checkValidatyBody(object) {
        expect(object).to.have.nested.property("status");
        expect(object).to.have.nested.property("data");
    };

    describe("Authentication", () => {
        it("should return missing params", (done) => {
            chai.request(app)
                .post('/auth')
                .send({
                    email:"dedicker@gmail.com",
                    password:"e5SLOp9Pp"
                })
                .end((err, res) => {
                    res.should.have.status(422);
                    // checkValidatyBody(res.body);
                    done();
                });
        });
        it("should authenticate succes", (done) => {
            chai.request(app)
                .post('/auth/')
                .send({
                    email:"dedicker@gmail.com",
                    password:"e5SLOp9Pp",
                    password_confirmation: "e5SLOp9Pp"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    checkValidatyBody(res.body);
                    expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
                    done();
                });
        });
        it("should authenticate failed - User already exist", (done) => {
            chai.request(app)
                .post('/auth/')
                .send({
                    email:"dedicker@gmail.com",
                    password:"e5SLOp9Pp",
                    password_confirmation: "e5SLOp9Pp"
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    checkValidatyBody(res.body);
                    expect(res.body.status).to.deep.equal(Msg.status.STATUS_KO)
                    done();
                });
        });
    });
});
