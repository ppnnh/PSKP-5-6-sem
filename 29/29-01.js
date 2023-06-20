const express = require('express');
const jsonRouter = require('express-json-rpc-router');
const bodyParser = require('body-parser');

const app = express();

const controller = {
	sum(params, raw) {
		const summary = params.reduce(function (sum, current) {
			return sum + current;
		}, 0);
		return summary;
	},
	mul(params, raw) {
		const multy = params.reduce(function (mul, current) {
			return mul * current;
		}, 1);
		return multy;
	},
	div(params, raw) {
		return params[0] / params[1];
	},
	proc(params, raw) {
		return (params[0] / params[1]) * 100;
	},
};

const sumMulValidator = function (params, _, raw) {
	if (!Array.isArray(params)) throw new Error('Enter mas');
	params.forEach(el => {
		if (!isFinite(el)) throw new Error('Params is not a number');
	});
	if (params[1] == 0) throw new Error('Zero');
	return params;
};

const validator = function (params, _, raw) {
	if (!Array.isArray(params)) throw new Error('Enter mas');
	if (params.length != 2) throw new Error('Enter second param');
	params.forEach(el => {
		if (!isFinite(el)) throw new Error('Params is not a number');
	});
	if (params[1] == 0) throw new Error('Zero');
	return params;
};

const before = {
	sum: (params, _, raw) => sumMulValidator(params, _, raw),
	mul: (params, _, raw) => sumMulValidator(params, _, raw),
	div: (params, _, raw) => validator(params, _, raw),
	proc: (params, _, raw) => validator(params, _, raw),
};

app.use(express.json());
app.use(bodyParser());
app.use(
	jsonRouter({
		methods: controller,
		beforeMethods: before,
		onError(err) {
			console.log(err);
		},
	})
);

app.listen(3000);
