// require('../../main.js');
const user = require('../api/users/get-list-users.api.js');
const schema = require('../data/schema.js')
require('chai').use(require('chai-json-schema'))
const log = console.log
const sort = require('../helper/is-sorted.js')

let startTime;

describe("Feature: Get List All Users", () => {
    beforeEach(() => {
        startTime = Date.now();
    });

    it("USER.001 - Get list all users without parameter", async () => {
        const res = await user.getListAllUsers();

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.data).not.toBe(null);
        expect((res.body.data).length).toBe(10);
    })

    it("USER.002 - GET list of all USERS with valid page value", async () => {
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

    it("USER.003 - GET list of all USERS with valid per_page value", async () => {
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

    it("USER.004 - GET list of all USERS with invalid page value", async () => {
        const expectedPage = "invalid";
        const expectedPerPage = 1;

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/page/i && /must be integer/i);
    })

    it("USER.005 - GET list of all USERS with invalid per_page value", async () => {
        const expectedPage = 1;
        const expectedPerPage = "invalid";

        const res = await user.getListAllUsers(expectedPage, expectedPerPage);

        //Performance test
        expect(Date.now() - startTime).toBeLessThan(2000);

        //Functionality test
        expect(res.statusCode).toBe(400);
        expect(JSON.stringify(res.body)).toMatch(/per_page/i && /must be integer/i);
    })

    it("USER.006 - Verify id is sorted ascending", async () => {
        const res = await user.getListAllUsers();

        const idArray = res.body.data.map(obj => obj.id);

        log(idArray)

        expect(sort.isArraySortedAscending(idArray))
    })
})
