const API = require('.')
const _ = require('lodash')
const lodashFilter = require('../utils/lodashFunctions')

const getPoliciesByEmail = (email) => {
    return new Promise((resolve, reject) => {
        API.fetchPoliciesList()
        .then( data => {
            let result = lodashFilter.customFilter(data.data["policies"], ['email', email])
            resolve(result);
        })
        .catch(err => {
            reject(err)
        })
    })
}

const getPolicyById = (id) => {
    return new Promise((resolve, reject) => {
        API.fetchPoliciesList()
        .then( data => {
            let result = lodashFilter.customFilter(data.data["policies"], ['id', id])
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    })
}

const getPolicies = () => {
    const model = [ "email", "id"]
    return new Promise((resolve, reject) => {
        API.fetchPoliciesList()
        .then( data => {
            const result =  lodashFilter.customMap(data.data["policies"], (item) => { return _.pick(item, model) })
            resolve(result);
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getPoliciesByEmail : getPoliciesByEmail,
    getPolicyById : getPolicyById,
    getPolicies: getPolicies
}