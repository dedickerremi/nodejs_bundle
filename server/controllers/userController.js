const Msg = require('../constants/response')
const dataManagement = require('../API/userManagement')

const userById = (req, res) => {
  dataManagement.getClientById(req.params.slug)
  .then((result) => {
      res.ok(result);
  }).catch(err => {
      res.internalError(err)
  })
}

const userByEmail = (req, res) => {
  dataManagement.getClientByMail(req.params.slug)
  .then((result) => {
    res.ok(result);
  }).catch(err => {
    res.internalError(err)
  })
}

const getUsers = (req, res) => {
  dataManagement.getClients()
  .then((result) => {
    res.ok(result);
  }).catch(err => {
    res.internalError(err)
  })
}


module.exports = {
  userById: userById,
  userByEmail: userByEmail,
  getUsers: getUsers
}