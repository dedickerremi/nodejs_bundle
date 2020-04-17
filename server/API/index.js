const axios = require('axios')

const fetchClientList = () => {
    return axios.get("http://www.mocky.io/V2/5808862710000087232b75ac")
}

const fetchPoliciesList = () => {
    return axios.get("http://www.mocky.io/v2/580891a4100000e8242b75c5")
}

module.exports = {
    fetchClientList: fetchClientList,
    fetchPoliciesList: fetchPoliciesList
}