const Msg = require('../constants/response')
const API = require('../API')
const _ = require('lodash')

const model = [ "email", "id"]

const userById = (req, res) => {
    API.fetchClientList()
    .then( data => {
      let result = _.filter(data.data["clients"], ['id', req.params.slug])
        if (result.length >= 1) {
            result = result.shift();
            res.ok(result);
        } else {
          res.ko("Data not found")
        }
    })
    .catch(err => {
      console.log(err);
      res.ko(err)
    })
}

const userByEmail = (req, res) => {
  API.fetchClientList()
    .then( data => {
      let result = _.filter(data.data["clients"], ['email', req.params.slug])
        if (result.length >= 1) {
            result = result.shift();
            res.ok(result);
        } else {
          res.ko("Data not found")
        }
    })
    .catch(err => {
      console.log(err);
      res.ko(err)
    })
}

const getUsers = (req, res) => {
  API.fetchClientList()
  .then( data => {
    const result =  _.map(data.data["clients"], (item) => { return _.pick(item, model) })
    res.ok(result);
  })
  .catch(err => {
    console.log(err);
    res.ko(err)
  })
}


module.exports = {
  userById: userById,
  userByEmail: userByEmail,
  getUsers: getUsers
}