//express and node and variable.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//setting view engine.
app.set('view engine','ejs');
//call bodyParser
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//function to get the value and output the key.
function getURLKey(obj, value) {
  return Object.keys(URL).find(key => obj[key] === value);
};

//ID creator.
function makeId(){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

//list of URLS
const urlIndex = {
  "x21jfl" : "https://www.google.ca",
  "va31km" : "https://ca.yahoo.com",
  "y34sfa" : "https://www.youtube.com",
  "hello" : "https://www.twitter.com"
};

//homepage
app.get('/', (req, res) => {
  res.send('First Node Server > thanks Gonzo');
});


//renders table as well as gets input for the url shortener.
app.get('/home', function(req, res){
  app.locals.urlIndex = urlIndex;
  res.render('pages/home');
  var newUrl = req.body.newUrl;
  urlIndex[makeId()] = newUrl;
  console.log(newUrl)

});

app.post('/home', function(req, res){
 
});


//if there is a shortened URL present it will redirect to the correct website, or else will bring them to a 404 page.
app.get('/*', (req, res) => {
    var url = req.url;
    var external = (getURLKey(urlIndex, url.slice(1)));
    if (external != undefined) {
      res.redirect(external);
    } else {
      res.send('404 page not found');
    }
});

app.listen(port, () => {
  console.log(`URL Shortener App is listening on port ${port}`)
});