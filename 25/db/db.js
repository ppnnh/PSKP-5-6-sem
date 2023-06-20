const Sequelize = require('sequelize')
const redis = require('redis')

global.sequelize = new Sequelize('lab25', 'student', 'fitfit', {
	host: 'localhost',
	dialect: 'mssql',
	port: 1433,
	pool: {
		min: 0,
		max: 5,
	},}) 

const redisClient = redis.createClient('//redis-10275.c124.us-central1-1.gce.cloud.redislabs.com:10275',
{password: 'RMjSK1pCVWjZARGPjtE9fOwjIbGTBQVz'})

const {Users, Repos, Commits} = require('./models')

module.exports = {
    redisClient,
    models: {Users, Repos, Commits}
}