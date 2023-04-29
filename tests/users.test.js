const app = require('../app')
const request = require("supertest");

beforeAll(() => {
    return request(app).post("/api/users").send({ 
        first_name: "Shiam", 
        last_name: "Dulla", 
        email: "shiamdulla@gmail.com", 
        password: "password", 
        confirm_password: "password"
    })
})

describe("POST /api/users (signup)", () => {
    it("test bad request" , () => {
        return request(app).post("/api/users").expect(400)
    });

    it("test incorrect email bad request" , () => {
        return request(app).post("/api/users")
            .send({ email: "askdhaskj", password: "askdjhasl" })
            .expect(400)
        });

    it("valid body returns ok", () => {
        return request(app).post("/api/users").send({ 
            first_name: "Shiam", 
            last_name: "Dulla", 
            email: "shiamdulla1@gmail.com", 
            password: "password", 
            confirm_password: "password"
        })
            .expect(200)
    })
});

describe("GET /api/users/:email (get user)", () => {
    it("test user doesnt exist" , () => {
        return request(app).get("/api/users/nouser@gmail.com").expect(404)
    });
    
    it("test user does exist" , async () => {        
        return request(app).get("/api/users/shiamdulla@gmail.com").expect(200)
    });
});