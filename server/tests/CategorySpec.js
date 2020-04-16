import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
var mongoose = require('mongoose')
var Msg = require('../config/msgError')
import Category from '../model/categoryModel'
var expect = chai.expect;
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Category", () => {

    before(function(done) {
        Category.deleteMany({}, done);
    });

    after(function (done) {
        mongoose.disconnect();
        return done();
    });

    function checkValidatyBody(object) {
        expect(object).to.have.nested.property("status");
        expect(object).to.have.nested.property("data");
    };

    describe("GET /", () => {
        it("should get all category record", (done) => {
            chai.request(app)
                .get('/category/')
                .end((err, res) => {
                    res.should.have.status(200);
                    checkValidatyBody(res.body);
                    done();
                });
        });

    });
    describe("POST /", () => {
        it("should add new category", (done) => {
            chai.request(app)
                .post('/category/')
                .send({
                    name: 'toto'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    checkValidatyBody(res.body);
                    expect(res.body.status).to.deep.equal(Msg.status.STATUS_OK)
                    done();
                });
        });
        it("should return error because already created", (done) => {
            chai.request(app)
                .post('/category/')
                .send({
                    name: 'toto'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    checkValidatyBody(res.body)
                    expect(res.body.status).to.deep.equal(Msg.status.STATUS_KO)
                    expect(res.body.data).to.deep.equal(Msg.category.CATEGORY_EXISTED)
                    done();
                });
        });
    });
});
