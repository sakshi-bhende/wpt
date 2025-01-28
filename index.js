const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.get('/form', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product Form</title>
      </head>
      <body>
        <h1>Product Input Form</h1>
        <form action="/submit" method="POST">
          <label for="productId">Product ID:</label>
          <input type="text" id="productId" name="productId" required pattern="\\d+" title="Product ID must be a number" /><br/><br/>

          <label for="productName">Product Name:</label>
          <input type="text" id="productName" name="productName" required /><br/><br/>

          <label for="price">Price:</label>
          <input type="text" id="price" name="price" required pattern="\\d+(\\.\\d{1,2})?" title="Price must be a valid number" /><br/><br/>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});


app.post('/submit', (req, res) => {
  const { productId, productName, price } = req.body;

 
  if (!productId || !productName || !price) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error: All fields are required!</h1>
          <a href="/form">Go Back to Form</a>
        </body>
      </html>
    `);
  }


  console.log('Form Data:', { productId, productName, price });

  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Success</title>
      </head>
      <body>
        <h1>Form Submitted Successfully</h1>
        <p>Product ID: ${productId}</p>
        <p>Product Name: ${productName}</p>
        <p>Price: ${price}</p>
      </body>
    </html>
  `);
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
