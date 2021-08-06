import request from "../utils/instance.js";

export function temp(params) {
    return request.get('/src/assets/json/data.json', {
        params
    })
}