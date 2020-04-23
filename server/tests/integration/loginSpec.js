const chai = require('chai');
const chaiHttp = require('chai-http')

const app = require('../../../server');
const Msg = require('../../constants/response')
const expect = chai.expect;
const User = require('../../model/userModel')
chai.use(chaiHttp);

const TAG = "Login";

let token;

const createUser = (done) => {
    chai.request(app)
    .post('/auth/')
    .send({
        email:"dedicker@gmail.com",
        password:"e5SLOp9Pp",
        password_confirmation: "e5SLOp9Pp"
    })
    .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
        loginUser(res.body, done)
    });
}

const loginUser = (data, callback) => {
    chai.request(app)
    .post('/login')
    .send({
        email:"dedicker@gmail.com",
        password:"e5SLOp9Pp"
    })
    .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data.token;
        console.log(token);
        callback();
    });
}

describe(TAG, () => {
    
    before(function(done) {
        User.deleteMany({}, createUser(done));
    });

    after(function (done) {
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
