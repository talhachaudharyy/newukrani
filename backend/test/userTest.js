const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe('User API', () => {
    // Clear the User collection before each test
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     * Test the POST route
     */
    describe('POST /api/users/ipo', () => {
        it('It should create a new user with JSON data', (done) => {
            const userData = {
                firstName: 'John',
                middleName: 'M',
                lastName: 'Doe',
                cnicPhoto: 'base64_encoded_string_here', // You can use a base64 encoded image string
                height: 180,
                weight: 75,
                eyeColor: 'Brown',
                address: '123 Main St',
                phoneNumber: '+1234567890',
                gmail: 'john.doe@example.com'
            };

            chai.request(server)
                .post('/api/users/ipo')
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User registered successfully!');
                    done();
                });
        });
    });
});
