//express and node and variable.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//setting view engine.
app.set('view engine','ejs');

//function to get the value and output the key.
function getURLKey(obj, value) {
  return Object.keys(URL).find(key => obj[key] === value);
};

//list of URLS
const URL = 
  {"https://www.google.ca/" : "x21jfl",
  "https://ca.yahoo.com" : "va31km",
  "https://www.youtube.com" :"y34sfa"
};

app.get('/', (req, res) => {
  res.send('First Node Server > thanks Gonzo');
});

app.get('/home', function(req, res){
  res.render('pages/home', {URL});
});

app.get('/short', (req, res) => {
  res.render('/table');
});

//if there is a shortened URL present it will redirect to the correct website, or else will bring them to a 404 page.
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
});