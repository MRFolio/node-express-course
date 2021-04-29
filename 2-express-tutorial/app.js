const express = require('express');
// const app = require("express")();
const path = require('path');
const app = express();
let { products, people } = require('./data');
const logger = require('./logger');
const authorise = require('./authorize');

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).send({ success: true, person: name });
});

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, person: name });
  }
  res.status(201).send({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Provide credentials');
});

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
});

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );

  res.status(200).json({ success: true, data: newPeople });
});
// add logger only when "/api" is included in the route
// order matters of middleware
// app.use('/api', [logger, authorise]);
// app.use(express.static('./public'));

// // req => middleware => res
// app.get('/', (req, res) => {
//   res.send('Home');
// });

// app.get('/about', (req, res) => {
//   res.send('About');
// });

// app.get('/api/products', [logger, authorise], (req, res) => {
//   console.log(req.user);
//   res.send('Products');
// });

// app.get('/', (req, res) => {
//   // res.json([
//   //   { name: 'john', age: 25 },
//   //   { name: 'tere', age: 26 },
//   // ]);
//   // res.json(products);
//   res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
// });

// app.get('/api/products/:id/reviews/:reviewId', (req, res) => {
//   console.log(req.params);
//   res.send('hello world');
// });

// app.get('/api/v1/query', (req, res) => {
//   // console.log(req.query);
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];
//   if (search) {
//     sortedProducts = sortedProducts.filter((product) =>
//       product.name.startsWith(search)
//     );
//   }

//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }

//   if (sortedProducts.length < 1) {
//     // res.status(200).send('no products matched your search');
//     return res.status(200).json({ success: true, data: [] });
//   }

//   res.status(200).json(sortedProducts);
//   res.send('hello world');
// });

// app.get('/api/products', (req, res) => {
//   const newProducts = products.map(({ id, name, image }) => ({
//     id,
//     name,
//     image,
//   }));
//   res.json(newProducts);
// });

// app.get('/api/products/:id', (req, res) => {
//   // console.log(req.params); // string
//   const { id } = req.params;
//   const singleProduct = products.find((product) => product.id === Number(id));

//   if (!singleProduct) {
//     return res.status(404).send("Product doesn't exist");
//   }
//   return res.json(singleProduct);
// });

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
