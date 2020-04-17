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
const TAG = "Login"

describe(TAG, () => {
    before(function(done) {
        done()
    });

    after(function (done) {
        mongoose.disconnect();
        done();
    });

    function checkValidatyBody(object) {
        expect(object).to.have.nested.property("status");
        expect(object).to.have.nested.property("data");
    };

    describe(TAG, () => {
        it("Login with correct information", (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    email:"dedicker@gmail.com",
                    password:"e5SLOp9Pp"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    checkValidatyBody(res.body);
                    done();
                });
        });
        it("Login with fake information", (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    email:"dedicker@gmaddil.com",
                    password:"e5SLOp9Pp"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    checkValidatyBody(res.body);
                    done();
                });
        });
    });
});
