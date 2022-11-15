const express = require('express')
const app = express()
let ejs = require('ejs');
const port = 3000

app.set('view engine','ejs')

function getURLKey(obj, value) {
  return Object.keys(URL).find(key => obj[key] === value);
}

var bodyParser = require('body-parser')

const URL = 
  {"https://www.google.ca/" : "x21jfl",
  "https://ca.yahoo.com" : "va31km",
  "https://www.youtube.com" :"y34sfa"
};


app.get('/', (req, res) => {
  res.send('First Node Server > thanks Gonzo');
});

app.get('/get', (req, res) => {
  res.send('First Node Server > thanks Gonzo');
})


app.get('/*', (req, res) => {
    var url = req.url;
    var external = (getURLKey(URL, url.slice(1)));
    if (external != undefined) {
      res.redirect(external);
    } else {
      res.send('404 page not found');
    }
});


app.listen(port, () => {
  console.log(`URL Shortener App is listening on port ${port}`)
})