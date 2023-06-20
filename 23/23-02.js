const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const redisClient = redis.createClient({ legacyMode: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
	if (req.cookies.accessToken) {
		jwt.verify(req.cookies.accessToken, access, (err, user) => {
			if (err) next();
			else if (user) {
				req.user = user;
				next();
			}
		});
	} else next();
});

const sequelize = new Sequelize('USERS', 'student', 'fitfit', {
	host: 'localhost',
	dialect: 'mssql',
	port: 1433,
	pool: {
		min: 0,
		max: 5,
	},
});

const Model = Sequelize.Model;
class Users extends Model {}

Users.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false },
		password: { type: Sequelize.STRING, allowNull: false },
	},
	{
		sequelize,
		Users: 'USERS',
		tableName: 'USERS',
		createdAt: false,
		updatedAt: false,
	}
);

const access = 'accessToken';
const refresh = 'refreshToken';
let id = 20;

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res, next) => {
	const { name } = req.body;
	const us = await Users.findOne({
		where: {
			name: name,
		},
	});
	if (us) {
		const accessToken = jwt.sign({ id: us.id, name: us.name }, access, {
			expiresIn: 10 * 60,
		});
		const refreshToken = jwt.sign(
			{ id: us.id, name: us.name },
			refresh,
			{
				expiresIn: 24 * 60 * 60,
			}
		);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			sameSite: 'strict',
		});
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			sameSite: 'strict',
		});
		res.send('Login');
	} else {
		res.redirect('/login');
	}
});

app.get('/refresh-token', (req, res) => {
	if (req.cookies.refreshToken) {
		jwt.verify(req.cookies.refreshToken, refresh, async (err, user) => {
			if (err) console.log(err.message);
			else if (user) {
				redisClient.exists(`${id}`, function (err, reply) {
					if (reply === 1) {
						console.log('Exists');
						redisClient.del(`${id}`, function (err, result) {
							console.log('DELETE ' + result);
						});
					}
				});

				redisClient.get(`${id}`, (err, result) => console.log('get ', result));

				const candidate = await Users.findOne({
					where: {
						id: user.id,
					},
				});
				const newAccessToken = jwt.sign(
					{ id: candidate.id, name: candidate.name },
					access,
					{ expiresIn: 10 * 60 }
				);
				const newRefreshToken = jwt.sign(
					{ id: candidate.id, name: candidate.name },
					refresh,
					{ expiresIn: 24 * 60 * 60 }
				);

				res.cookie('accessToken', newAccessToken, {
					httpOnly: true,
					sameSite: 'strict',
				});
				res.cookie('refreshToken', newRefreshToken, {
					path: '/refresh-token',
				});

				console.log('NEW REFRESH ' + req.cookies.refreshToken);

				redisClient.set(`${id}`, `${req.cookies.refreshToken}`, () =>
					console.log('set ' + req.cookies.refreshToken)
				);

				redisClient.get(`${id}`, (err, result) => console.log('get ', result));

				id++;
			}
			res.redirect('/resource');
		});
	} else res.status(401).send('Authorize');
});

app.get('/resource', (req, res) => {
	if (req.user)
		res
			.status(200)
			.send(`RESOURCE userId:${req.user.id} name:${req.user.name}`);
	else res.status(401).send('Unauthorized');
});

app.get('/logout', (req, res) => {
	res.clearCookie('accessToken');
	res.clearCookie('refreshToken');

	res.redirect('/login');
});

app.get('/register', (req, res) => {
	res.sendFile(__dirname + '/reg.html');
});

app.post('/register', async (req, res) => {
	const us = await Users.findOne({
		where: {
			name: req.body.name,
		},
	});
	if (us) res.redirect('/register');
	else {
		await Users.create({
			name: req.body.name,
			password: req.body.password,
		});
		res.redirect('/login');
	}
});

app.all('*', (req, res) => {
	res.status(404);
	throw new Error('Page not found');
});

app.use(function (err, req, res, next) {
	res.send(err.message);
});

sequelize.sync().then(() => {
	app.listen(3000, () => {
		redisClient.connect();
		redisClient.on('error', err => {
			console.log('error ' + err);
		});
		redisClient.on('connect', () => {
			console.log('redis connected');
		});
		sequelize
			.authenticate()
			.then(() => console.log('connection success'));

	});
});
