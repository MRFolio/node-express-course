const express = require('express');
// const app = require("express")();
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.json([
    { name: 'john', age: 25 },
    { name: 'tere', age: 26 },
  ]);
});

// setup static and middleware
// app.use(express.static('./methods-public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// });

// app.all('*', (req, res) => {
//   res.status(404).send('resource not found');
// });

// app.get('/', (req, res) => {
//   res.status(200).send('Home page');
// });

// app.get('/about', (req, res) => {
//   res.status(200).send('About page');
// });

// app.all('*', (req, res) => {
//   res.status(404).send('<h1>resource not found</h1>');
// });

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});

// const http = require('http');

// const { readFileSync } = require('fs');

// // get all files
// const homePage = readFileSync('./navbar-app/index.html');
// const homeStyles = readFileSync('./navbar-app/styles.css');
// const homeImage = readFileSync('./navbar-app/logo.svg');
// const homeLogic = readFileSync('./navbar-app/browser-app.js');

// const server = http.createServer((req, res) => {
//   console.log(req.method);
//   const { url } = req;

//   if (url === '/') {
//     res.writeHead(200, {
//       'content-type': 'text/html',
//     });
//     res.write(homePage);
//     res.end();
//   } else if (url === '/about') {
//     res.writeHead(200, {
//       'content-type': 'text/html',
//     });
//     res.write('<h1>about page</h1>');
//     res.end();
//   } else if (url === '/styles.css') {
//     res.writeHead(200, {
//       'content-type': 'text/css',
//     });
//     res.write(homeStyles);
//     res.end();
//   } else if (url === '/logo.svg') {
//     res.writeHead(200, {
//       'content-type': 'image/svg+xml',
//     });
//     res.write(homeImage);
//     res.end();
//   } else if (url === '/browser-app.js') {
//     res.writeHead(200, {
//       'content-type': 'text/javascript',
//     });
//     res.write(homeLogic);
//     res.end();
//   } else {
//     res.writeHead(404, 'Not Found,something went wrong', {
//       'content-type': 'text/html',
//     });
//     res.write('<h1>page not found</h1>');
//     res.end();
//   }
// });

// server.listen(5000);
