const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http')
const server = require('../bin/www')
chai.use(chaiHttp)

describe('Testing endpoints...', function () {

    it('Test / endpoint', function (done) {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            })
    })

    it('Test /files/data endpoint with no query params', function (done) {
        //Larger timeout for this endpoint, because the response time depends on external API and may be over than 2000ms
        this.timeout(10000)
        chai.request(server)
            .get('/files/data')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((item) => {
                    item.should.have.property("file");
                    item.should.have.property("lines");
                })
                done()
            });
    })

    it('Test /files/data endpoint with valid query param', function (done) {
        //Larger timeout for this endpoint, because the response time depends on external API and may be over than 2000ms
        this.timeout(10000)
        chai.request(server)
    
            .get('/files/data?fileName=test9.csv')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((item) => {
                    item.should.have.property("file");
                    item.should.have.property("lines");
                })
                done()
            });
    })

    it('Test /files/data endpoint with invalid query param', function (done) {
        //Larger timeout for this endpoint, because the response time depends on external API and may be over than 2000ms
        this.timeout(10000)
        chai.request(server)
    
            .get('/files/data?fileNameoi=test9.csv')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach((item) => {
                    item.should.have.property("file");
                    item.should.have.property("lines");
                })
                done()
            });
    })

    it('Test /files/list endpoint', function (done) {
        //Larger timeout for this endpoint, because the response time depends on external API and may be over than 2000ms
        this.timeout(10000)
        chai.request(server)
            .get('/files/list')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('files')
                done()
            });
    })
})