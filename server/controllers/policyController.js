const Msg = require('../constants/response')
const API = require('../API')
const lodashFilter = require('../utils/lodashFunctions')
const _ = require('lodash')
const dataManagement = require('../API/policyManagement')


const getUserDataBypolicyId = (req, res) => {
  dataManagement.getPolicyById(req.params.slug)
  .then((result) => {
    res.ok(result);
  }).catch(err => {
    res.internalError(err)
  })
}

const policiesByEmail = (req, res) => {
  dataManagement.getPoliciesByEmail(req.params.slug)
  .then((result) => {
    res.ok(result);
  }).catch(err => {
    res.internalError(err)
  })
}

const getPolicies = (req, res) => {
  dataManagement.getPolicies()
  .then((result) => {
    res.ok(result);
  }).catch(err => {
    res.internalError(err)
  })
}


module.exports = {
  getUserDataBypolicyId: getUserDataBypolicyId,
  policiesByEmail: policiesByEmail,
  getPolicies: getPolicies
}