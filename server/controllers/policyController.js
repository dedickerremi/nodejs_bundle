const Msg = require('../constants/response')
const API = require('../API')
const lodashFilter = require('../utils/lodashFunctions')
const _ = require('lodash')
const model = [ "email", "id"]

const getUserDataBypolicyId = (req, res) => {
  API.fetchPoliciesList()
  .then( data => {
      let result = lodashFilter.customFilter(data.data["policies"], ['id', req.params.slug])
      res.ok(result)
  })
  .catch(err => {
    console.log(err);
    res.ko(err)
  })
}

const policiesByEmail = (req, res) => {
  API.fetchPoliciesList()
    .then( data => {
      let result = lodashFilter.customFilter(data.data["policies"], ['email', req.params.slug])
      res.ok(result);
    })
    .catch(err => {
      console.log(err);
      res.ko(err)
    })
}

const getPolicies = (req, res) => {
  API.fetchPoliciesList()
  .then( data => {
    const result =  lodashFilter.customMap(data.data["policies"], (item) => { return _.pick(item, model) })
    res.ok(result);
  })
  .catch(err => {
    console.log(err);
    res.ko(err)
  })
}


module.exports = {
  getUserDataBypolicyId: getUserDataBypolicyId,
  policiesByEmail: policiesByEmail,
  getPolicies: getPolicies
}