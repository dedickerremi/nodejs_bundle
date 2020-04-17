const API = require('.')
const _ = require('lodash')
const lodashFilter = require('../utils/lodashFunctions')

const getClientByMail = (email) => {
    return new Promise((resolve, reject) => {
        API.fetchClientList()
        .then( data => {
            const result = lodashFilter.customFilter(data.data["clients"], ['email', email], true)
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    })
}

const getClientById = (id) => {
    return new Promise((resolve, reject) => {
        API.fetchClientList()
        .then( data => {
            const result = lodashFilter.customFilter(data.data["clients"], ['id', id], true)
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    })
}

const getClients = () => {
    const model = [ "email", "id"]
    return new Promise((resolve, reject) => {
        API.fetchClientList()
        .then( data => {
            const result =  lodashFilter.customMap(data.data["clients"], (item) => { return _.pick(item, model) })
            resolve(result);
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getClientByMail : getClientByMail,
    getClientById : getClientById,
    getClients: getClients
}