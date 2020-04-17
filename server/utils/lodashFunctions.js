const _ = require('lodash')

const customFilter = (data, filter, oneResult = false) => {
    let result = _.filter(data, filter)
    if (oneResult && result.length > 0) {
        result = result.shift();
    }
    return result;
}

const customMap = (data, filter) => {
    return _.map(data, filter )
}

module.exports = {
    customFilter: customFilter,
    customMap: customMap
}