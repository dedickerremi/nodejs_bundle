const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../../../server');
const Msg = require('../../constants/response')
const User = require('../../model/userModel')
const connect = require('../../db/connect')
// Configure chai
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const TAG = "POLICIES";
let token;

const email = "britneyblankenship@quotezart.com";
const password = "e5SLOp9Pp";

const createUser = (done) => {
    chai.request(app)
    .post('/auth')
    .send({
        email: email,
        password: password,
        password_confirmation: password
    })
    .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
        loginUser(done)
    });
}

const loginUser = (callback) => {
    chai.request(app)
    .post('/login')
    .send({
        email: email,
        password: password
    })
    .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.token).to.exist;
        token = res.body.data.token;
        callback();
    });
}

describe(TAG, () => {
    before(function(done) {
        User.deleteMany({}, (err) => {});
        createUser(done);
    });
    after(function (done) {
        User.deleteMany({}, (err) => {});
        done();
    });
    describe(TAG, () => {
        it("Get Policies by mail - Admin token should success", (done) => {
            chai.request(app)
            .get('/policies/email/inesblankenship@quotezart.com')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
                done();
            });
        });
    });
    describe(TAG, () => {
        it("Get Policies by mail - Request without token on header", (done) => {
            chai.request(app)
            .get('/policies/email/inesblankenship@quotezart.com')
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body.status).to.deep.equal(Msg.status.STATUS_KO)
                done();
            });
        });
    });
    describe(TAG, () => {
        it("Get User information by ID should success", (done) => {
            chai.request(app)
            .get('/policies/id/64cceef9-3a01-49ae-a23b-3761b604800b')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
                done();
            });
        });
    });
    describe(TAG, () => {
        it("Get User information by ID - Request without token on header", (done) => {
            chai.request(app)
            .get('/policies/id/64cceef9-3a01-49ae-a23b-3761b604800b')
            .end((err, res) => {
                res.should.have.status(401);
                expect(res.body.status).to.deep.equal(Msg.status.STATUS_KO)
                done();
            });
        });
    });
});
