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
app.get('/', (request, response) => {
  response.json({ info: 'Node.js and Express' })
})


// This is the cipher request:

// app.get('/cipher', function(request, response) {

//   response.json("This is the cipher function")

  
// });

app.get('/cipher', function(request, response) {

  let text = request.query.text;
  let shift = request.query.shift;
  let encryptedText;

  // This is the cipher method:

    function caesarCipher(text, shift) {
      const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      let textArray = text.split("");
      let cryptArray = [];
      textArray.forEach(function(letter, index) {
        if (shift > alpha.length) {
          shift = (shift % alpha.length);
        }
        if (alpha.includes(letter.toLowerCase())) {
          if (letter === letter.toLowerCase()) {
            if (alpha.indexOf(letter) + shift < 26) {
              cryptArray.push(alpha[alpha.indexOf(letter) + shift]);
            } else { 
              cryptArray.push(alpha[alpha.length - ((alpha.length + (alpha.length - alpha.indexOf(letter.toLowerCase()) - shift)))]);
            }
          } else {
            if (alpha.indexOf(letter.toLowerCase()) + shift < 26) {
              cryptArray.push((alpha[alpha.indexOf(letter.toLowerCase()) + shift]).toUpperCase());
            } else {
              cryptArray.push((alpha[alpha.length - ((alpha.length + (alpha.length - alpha.indexOf(letter.toLowerCase()) - shift)))].toUpperCase()));
            }
          } 
        } else {
          cryptArray.push(letter);
        }
      });
      whateverArray = ["a", "b"]
      return whateverArray;
      // return [text, shift];
      // return cryptArray;
      // cryptString = cryptArray.join("");
      // return `${cryptString} and pancakes`;
      // encryptedText = "waffle"
      // return encryptedText;

      // return cryptArray.join("");
      // return `text: ${text} and shift ${shift} and crypt array: ${cryptString}`
      
    }

  encryptedText = caesarCipher(text, shift);

  // Here ends the cipher method.

  response.json(`This is the text: ${text} and this is the shift value: ${shift}, and this is the encrypted text: ${encryptedText}`);
  
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
