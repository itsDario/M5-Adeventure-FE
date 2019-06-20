//server.js

import express, { static } from 'express';
import favicon from 'express-favicon';
import { join } from 'path';
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(static(__dirname));
app.use(static(join(__dirname, 'build')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/*', function (req, res) {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(port);