import {
    isObj,
    isFun,
    isStr,
} from 'LIBS/type'
import { has } from 'LIBS/helpers'
import parser from 'MATCH/parser'

export const matchObject = function (data, obj) {
    let result = {}
    for (let i in obj) {
        if (!has(obj, i)) continue
        const rules = parser.parse(obj[i], i)
        result[i] = parser.assignData(data, rules)
    }
    return result
}

const match = {
    parse: (data, keys) => {
        if (isObj(keys)) {
            return matchObject(data, keys)
        }
        return data
    },
}

export default match