const Msg = require('../constants/response')
const API = require('../API')
const lodashFilter = require('../utils/lodashFunctions')
const _ = require('lodash')
const policiesAPI = require('../API/policyAPI')
const userAPI = require('../API/userAPI')


const getUserDataBypolicyId = (req, res) => {
  policiesAPI.getPolicyById(req.params.slug)
  .then((result) => {
    userAPI.getClientById(result.clientId)
    .then(result => {
      return res.ok(result);
    })
    .catch(err => {
      return res.ko(err);
    })
  }).catch(err => {
    return res.internalError(err)
  })
}

const policiesByEmail = (req, res) => {
  policiesAPI.getPoliciesByEmail(req.params.slug)
  .then((result) => {
    return res.ok(result);
  }).catch(err => {
    return res.internalError(err)
  })
}

const getPolicies = (req, res) => {
  policiesAPI.getPolicies()
  .then((result) => {
    return res.ok(result);
  }).catch(err => {
    return res.internalError(err)
  })
}


module.exports = {
  getUserDataBypolicyId: getUserDataBypolicyId,
  policiesByEmail: policiesByEmail,
  getPolicies: getPolicies
}