import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { createClient } from 'webdav';

const __dirname = path.resolve();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(function (err, req, res, next) {
	res.send(err.message);
});

const client = createClient('https://webdav.yandex.ru', {
	username: 'valeriaburanko@yandex.ru',
	password: 'kpgvgztptfsodnwr',
});

app.post('/md/:name', async (req, res) => {
	const dirName = req.params.name;
	if (await client.exists(`/${dirName}`)) {
		res.status(408);
		res.send('This directory exists');
	} else {
		await client.createDirectory(`/${dirName}`);
		res.send('Directory created');
	}
});

app.post('/rd/:name', async (req, res) => {
	const dirName = req.params.name;
	if (await client.exists(`/${dirName}`)) {
		await client.deleteFile(`/${dirName}`);
		res.send('Directory deleted');
	} else {
		res.status(404);
		res.send('Directory is not found');
	}
});

app.post('/up/:file', async (req, res) => {
	const file = req.params.file;
	if (file.includes('.')) {
		if (fs.existsSync(`${file}`)) {
			fs.createReadStream(__dirname + `/${file}`).pipe(
				client.createWriteStream(`/${file}`)
			);
			res.send('Upload file');
		} else {
			res.status(404);
			res.send('File not found');
		}
	} else {
		res.send('Is not a file');
	}
});

app.post('/down/:file', async (req, res) => {
	const file = req.params.file;
	if (file.includes('.')) {
		if (await client.exists(`/${file}`)) {
			client
				.createReadStream(`/${file}`)
				.pipe(fs.createWriteStream(`./${file}`));
			res.send('Download file');
		} else {
			res.send('File is exists');
		}
	} else {
		res.send('Is not a file');
	}
});

app.post('/del/:file', async (req, res) => {
	const file = req.params.file;
	if (file.includes('.')) {
		if (await client.exists(`/${file}`)) {
			await client.deleteFile(file);
			res.send('File deleted');
		} else {
			res.status(404);
			res.send('File not found');
		}
	} else {
		res.send('Is not a file');
	}
});

app.post('/copy/:oldName/:newName', async (req, res) => {
	const oldName = req.params.oldName;
	const newName = req.params.newName;
	await client.copyFile(`/${oldName}`, `/${newName}`);
	res.send('File copied');
});

app.post('/move/:oldName/:newName', async (req, res) => {
	const oldName = req.params.oldName;
	const newName = req.params.newName;
	await client.moveFile(`/${oldName}`, `/${newName}`);
	res.send('File moved');
});

app.listen(3000);
