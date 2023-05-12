const express = require('express');
const { query, matchedData, validationResult, body } = require('express-validator');
const app = express();

app.use(express.json());
app.get('/hello', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    return res.send(`Hello, ${data.person}!`);
  }

  res.send({ errors: result.array() });
});

// const baseEmailChain = body('email').isEmail();
// app.post("/post", baseEmailChain().isEmail(),(req,res)=>{
//   res.end("hello")
// })

app.post(
  '/update',
  body('**.name').notEmpty(),
  
  (req, res) => {
    res.send("POST Request Called")
  },
);

app.listen(7000);