import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as products from './products';
 
const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("PUBLIC API");
  next();
});

app.use((req, res, next) => {
  console.log("next possible step");
  next();
});

app.listen(PORT);

app.get('/products', (req, res, next) => {
  const productId = req.params.productId;
  res.send(products.productsList);

  next();
});

app.get('/products/:productId', (req, res, next) => {
  const productId: number = parseInt(req.params.productId);
  res.send(products.productsList.find((product) => product.id === productId));

  next();
});

app.post('/products', (req, res, next) => {
  let newProduct: products.Product = req.body;

  products.productsList.push( products.createNewProductFromData(newProduct) );

  res.send(products.productsList);
  
  next();
})

console.log("server works on port " + PORT);