const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js and Express' })
})


// This is the cipher request:

app.get('/cipher', function(request, response) {

  let text = request.query.text;
  let shift = request.query.shift;
  let encryptedText;

  // This is the cipher function:

function caesarCipher(lexicon, rubicon) {
      const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      let shifted = parseInt(rubicon);
      let lexiconArray = lexicon.split("");
      let cryptArray = [];
      lexiconArray.forEach(function(letter, index) {
        if (shifted > alpha.length) {
          shifted = (shifted % alpha.length);
        }
        if (alpha.includes(letter.toLowerCase())) {
          if (letter === letter.toLowerCase()) {
            if (alpha.indexOf(letter) + shifted < 26) {
              cryptArray.push(alpha[alpha.indexOf(letter.toLowerCase()) + shifted]);
            } else { 
              cryptArray.push(alpha[alpha.length - ((alpha.length + (alpha.length - alpha.indexOf(letter.toLowerCase()) - shifted)))]);
            }
          } else {
            if (alpha.indexOf(letter.toLowerCase()) + shifted < 26) {
              cryptArray.push((alpha[alpha.indexOf(letter.toLowerCase()) + shifted]).toUpperCase());
            } else {
              cryptArray.push((alpha[alpha.length - ((alpha.length + (alpha.length - alpha.indexOf(letter.toLowerCase()) - shifted)))].toUpperCase()));
            }
          } 
        } else {
          cryptArray.push(letter);
        }

      });
      return cryptArray.join("");
    }

    encryptedText = caesarCipher(text, shift);

  // Here ends the cipher function.

  response.json(`This is the text: ${text} and this is the shift value: ${shift}, and this is the encrypted text: ${encryptedText}`);
  
});


// Here ends the cipher request.

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
