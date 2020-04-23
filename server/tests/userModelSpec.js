const chai = require('chai');
const expect = chai.expect;
const User = require('../model/userModel')
// Configure chai
const should = chai.should();

const TAG = "UserModelSpec";

describe(TAG, () => {
    describe(TAG, () => {
        it("UserModel Creation", (done) => {
            let user = new User({email: "dede@gmail.com", password: "test"});
            expect(user.role).to.be.equal("user");
            done();
        });
    });
});
