const supertest = require('supertest');
const { BASE_URL, USER_ENDPOINT } = require('../../main.js');
require('../../main.js');
const {faker} = require('@faker-js/faker');

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

async function createANewValidUser(name = faker.person.fullName(), job = faker.person.jobTitle()) {
    const payload = {
        name: name,
        job: job
    }

    try {
        return await supertest(BASE_URL)
            .post(USER_ENDPOINT)
            .set("Content-Type", "application/json")
            .send(payload)
    } catch (error) {
        console.log(error)
    }
}

async function updateAnUser(userId, name = undefined, job = undefined){
    const payload = {
        name: name,
        job: job
    }
    try {
        return await supertest(BASE_URL)
        .put(USER_ENDPOINT + "/" + userId)
        .set("Content-Type", "application/json")
        .send(payload)
    } catch (error) {
        console.log(error)
    }
}

async function getSingleUser(userId){
    try {
        return await supertest(BASE_URL)
        .get(USER_ENDPOINT + "/" + userId)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getListAllUsers,
    createNewUser,
    createANewValidUser,
    updateAnUser,
    getSingleUser
}