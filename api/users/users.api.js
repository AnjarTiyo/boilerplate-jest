const supertest = require('supertest');
const { BASE_URL, USER_ENDPOINT } = require('../../main.js');
require('../../main.js');

async function getListAllUsers(page = 1, per_page = 10) {
    try {
        return await supertest(BASE_URL)
            .get(USER_ENDPOINT)
            .query({
                page: page,
                per_page: per_page
            })
    } catch (error) {
        console.log(error)
    }
}

async function createNewUser(payload) {
    try {
        return await supertest(BASE_URL)
            .post(USER_ENDPOINT)
            .set("Content-Type", "application/json")
            .send(payload)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getListAllUsers,
    createNewUser
}