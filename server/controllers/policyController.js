const Msg = require('../constants/response')
const API = require('../API')
const _ = require('lodash')

const model = [ "email", "id"]

const policyById = (req, res) => {
    API.fetchPoliciesList()
    .then( data => {
      let result = _.filter(data.data["policies"], ['id', req.params.slug])
        if (result.length >= 1) {
            result = result.shift();
            res.ok(result);
        } else {
          res.ko(result)
        }
    })
    .catch(err => {
      console.log(err);
      res.ko(err)
    })
}

const policiesByEmail = (req, res) => {
  API.fetchPoliciesList()
    .then( data => {
      let result = _.filter(data.data["policies"], ['email', req.params.slug])
        if (result.length > 0) {
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

const getPolicies = (req, res) => {
  API.fetchPoliciesList()
  .then( data => {
    const result =  _.map(data.data["policies"], (item) => { return _.pick(item, model) })
    res.ok(result);
  })
  .catch(err => {
    console.log(err);
    res.ko(err)
  })
}


module.exports = {
  policyById: policyById,
  policiesByEmail: policiesByEmail,
  getPolicies: getPolicies
}