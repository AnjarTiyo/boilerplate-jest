const supertest = require('supertest');
const { BASE_URL, GET_LIST_USER_ENDPOINT } = require('../../main.js');
require('../../main.js');

async function getListAllUsers(page = 1, per_page = 10){
    return await supertest(BASE_URL)
    .get(GET_LIST_USER_ENDPOINT)
    .query({
        page: page,
        per_page: per_page
    })
}

module.exports = {
    getListAllUsers
}