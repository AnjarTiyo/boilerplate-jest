// require('../../main.js');
const user = require('../api/users/users.api.js');
const log = console.log
const sort = require('../helper/is-sorted.js');
const {faker} = require('@faker-js/faker')

let startTime;

describe("Feature: Get List All Users", () => {
    beforeEach(() => {
        startTime = Date.now();
    });

    test("USER.001 - Get list all users without parameter", async () => {
        const res = await user.getListAllUsers();

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.data).not.toBe(null);

        expect((res.body.data).length).toBe(10);
    })

    test("USER.002 - GET list of all USERS with valid page value", async () => {
        const expectedPage = 2;

        const res = await user.getListAllUsers(expectedPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(200);
        expect(res.body.page).toBe(expectedPage);
        expect(res.body.data).not.toBe(null);
        expect((res.body.data).length).toBe(10);
    })

    test("USER.003 - GET list of all USERS with valid per_page value", async () => {
        const expectedPage = 2;
        const expectedPerPage = 1;

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(200);
        expect(res.body.page).toBe(expectedPage);
        expect(res.body.data).not.toBe(null);
        expect((res.body.data).length).toBe(expectedPerPage);
    })

    test("USER.004 - GET list of all USERS with invalid page value", async () => {
        const expectedPage = "invalid";
        const expectedPerPage = 1;

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/page/i && /must be integer/i);
    })

    test("USER.005 - GET list of all USERS with invalid per_page value", async () => {
        const expectedPage = 1;
        const expectedPerPage = "invalid";

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/per_page/i && /must be integer/i);
    })

    test("USER.006 - Verify id is sorted ascending", async () => {
        const res = await user.getListAllUsers();

        const idArray = res.body.data.map(obj => obj.id);

        log(idArray)

        expect(sort.isArraySortedAscending(idArray))
    })
})

describe.only("Feature: Create a new user", () => {
    beforeEach(() => {
        startTime = Date.now()
    })

    test("USER.007 - Create new user with valid data", async () => {
        const name = faker.person.fullName();
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(201);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(res.body.id).toMatch(/^-?\d+$/);
        expect(res.body.name).toBe(name);
        expect(res.body.job).toBe(job);
        expect(Date.parse(res.body.createdAt)).toBeLessThan(Date.now());
    })
})
