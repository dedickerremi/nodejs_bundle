const Msg = require('../constants/response')
const userAPI = require('../API/userAPI')

const userById = (req, res) => {
  userAPI.getClientById(req.params.slug)
  .then((result) => {
    return res.ok(result);
  }).catch(err => {
    return res.internalError(err)
  })
}

const userByEmail = (req, res) => {
  userAPI.getClientByMail(req.params.slug)
  .then((result) => {
    return res.ok(result);
  }).catch(err => {
    return res.internalError(err)
  })
}

const getUsers = (req, res) => {
  userAPI.getClients()
  .then((result) => {
    return res.ok(result);
  }).catch(err => {
    return res.internalError(err)
  })
}


module.exports = {
  userById: userById,
  userByEmail: userByEmail,
  getUsers: getUsers
}