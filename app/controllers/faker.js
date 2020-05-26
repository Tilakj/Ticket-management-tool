const faker = require('faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");


const Customer = require('../models/customer')
const Department = require('../models/department')
const Employee = require('../models/employee')
const Ticket = require('../models/ticket')
const User = require('../models/user')



//#region Fake Data Methods
function getFakeCustomers(numberOfFakeData, users) {
    const fakeData = [];
    for (let i = 0; i < numberOfFakeData; i++) {
        const fakeCustomer = new Customer({
            name: faker.name.findName(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumber('9#########'),
            user: _.sample(users)._id
        })
        fakeData.push(fakeCustomer)
    }
    return fakeData
}

function getFakeDepartments(numberOfFakeData, users) {
    const fakeData = [];
    for (let i = 0; i < numberOfFakeData; i++) {
        const fakeDepartment = new Department({
            name: faker.commerce.department(),
            user: _.sample(users)._id
        })
        fakeData.push(fakeDepartment)
    }
    return fakeData
}

function getFakeEmployees(numberOfFakeData, populateDept) {
    const fakeData = [];
    for (let i = 0; i < numberOfFakeData; i++) {
        const userId = _.sample(populateDept).user
        const deptId = _.sample(populateDept.filter(dept => dept.user == userId))._id
        const fakeEmployee = new Employee({
            name: faker.name.findName(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumber('9#########'),
            department: deptId,
            user: userId
        })
        fakeData.push(fakeEmployee)
    }
    return fakeData
}

function getFakeTickets(numberOfFakeData, populateDept, populateCust, populateEmps, userArr) {
    const fakeData = [];

    for (let i = 0; i < numberOfFakeData; i++) {
        const userId = _.sample(populateDept).user
        const deptId = _.sample(populateDept.filter(dept => dept.user == userId))._id
        const emps = populateEmps.filter(employee => employee.department._id == deptId && employee.user == userId)
        const fakeTicket = new Ticket({
            code: `${faker.random.word()}-${faker.random.number(4)}`,
            message: faker.lorem.sentence(),
            priority: _.sample(['high', 'medium', 'low']),
            department: deptId,
            customer: _.sample(populateCust.filter(cust => cust.user == userId))._id,
            employees: _.sampleSize(emps, Math.round(Math.random() * 5)).map(employee => (employee._id)),
            user: userId
        })
        fakeData.push(fakeTicket)
    }
    return fakeData
}
//#endregion

const url = "mongodb://localhost:27017";
const dbName = "ticket-master";
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log(err)
    const db = client.db(dbName);

    //get DB collections
    const customerCollection = db.collection("customers");
    const departmentCollection = db.collection("departments");
    const employeeCollection = db.collection("employees");
    const ticketCollection = db.collection("tickets");
    const userCollection = db.collection("users");

    //get fake data
    userCollection.find({}).toArray(function (err, users) {
        if (err)
            console.log(err)
        const customers = getFakeCustomers(100, users);
        const departments = getFakeDepartments(10, users)
        const employees = getFakeEmployees(25, departments);
        const userArr = [...employees, ...departments, ...customers].map(obj => {
            return { id: String(obj.user) }
        })
        const tickets = getFakeTickets(250, departments, customers, employees, _.uniqBy(userArr, 'id'));

        // insert to DB 
        customerCollection.insertMany(customers);
        departmentCollection.insertMany(departments);
        employeeCollection.insertMany(employees);
        ticketCollection.insertMany(tickets);
    })

});


