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

    test("Get list all users without parameter", async () => {
        const res = await user.getListAllUsers();

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.data).not.toBe(null);

        expect((res.body.data).length).toBe(10);
    })

    test("GET list of all USERS with valid page value", async () => {
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

    test("GET list of all USERS with valid per_page value", async () => {
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

    test("GET list of all USERS with invalid page value", async () => {
        const expectedPage = "invalid";
        const expectedPerPage = 1;

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/page/i && /must be integer/i);
    })

    test("GET list of all USERS with invalid per_page value", async () => {
        const expectedPage = 1;
        const expectedPerPage = "invalid";

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/per_page/i && /must be integer/i);
    })

    test("Verify id is sorted ascending", async () => {
        const res = await user.getListAllUsers();

        const idArray = res.body.data.map(obj => obj.id);

        expect(sort.isArraySortedAscending(idArray))
    })
})

describe("Feature: Create a new user", () => {
    beforeEach(() => {
        startTime = Date.now()
    })

    test("Create new user with valid data", async () => {
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

    test("Create new user with integer name", async () => {
        const name = Math.floor(Math.random() * 999);
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/must be string/i);
    })

    test("Create new user with undefined name", async () => {
        const name = undefined;
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/name is required/i);
    })

    test("Create new user with null name", async () => {
        const name = null;
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/name is required/i);
    })

    test("Create new user with boolean name", async () => {
        const name = true;
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/must be string/i);
    })

    test("Create new user with array name", async () => {
        const name = [faker.person.fullName(), faker.person.fullName()];
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/must be string/i);
    })

    test("Create new user with blank name", async () => {
        const name = "";
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/name is required/i);
    })

    test("Create new user with too few name", async () => {
        const name = "a".repeat(1);
        const job = faker.person.jobTitle();
        
        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res.body)).toMatch(/name is too short/i);
    })

    test("Create new user with too long name", async () => {
        const name = "a".repeat(102999);
        const job = faker.person.jobTitle();

        const payload = {
            "name": name,
            "job": job
        }
        const res = await user.createNewUser(payload);

        //Performance test
        // expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(413);
        // expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(JSON.stringify(res)).toMatch(/too large/i);
    })

    test("Create new user with already registered name", async () => {
        const name = faker.person.fullName();
        const job = faker.person.jobTitle();

        const payload = {
            "name": name,
            "job": job
        }

        await user.createNewUser(payload);
        const res = await user.createNewUser(payload);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(4000);

        //Functionality test
        expect(res.statusCode).toBe(201);
        expect(JSON.stringify(res.header)).toMatch(/application\/json/i);
        expect(res.body.id).toMatch(/^-?\d+$/);
        expect(res.body.name).toBe(name);
        expect(res.body.job).toBe(job);
        expect(Date.parse(res.body.createdAt)).toBeLessThan(Date.now());
    })
})
