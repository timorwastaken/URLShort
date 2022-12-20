//express and node and variable.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
let logInCheck = false;
//setting view engine.
app.set('view engine','ejs');
//call bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const getUrlFromShort = (shortUrl) => urlIndex[shortUrl];

//function to check if user exists
function userExists(username) {
  if (username in users) {
      return users[username];
  }else {
    return false;
  };
};
//function to check if username is valid
function passCheck(userPassword, loginPassword) {
  return userPassword === loginPassword;
};

//function that checks if the URL they are trying to add is duplicate or not.

function urlChecker(obj, user, pass) {
  if (Object.values(urlIndex).includes(val)){
    return "Your URL has not been added as it is already in our Database";
  } else {
    return "Your URL has been added, please go to the URL list to check on this URL";
  };
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
//list of logins
const users = {
  "ahmed.dahi@shopify.com" : "sohelpmegod",
  "dog.dog@gmail.com" : "passpasss",
  "fireemoji@yahoo.ca" : "fire",
  "helphelp@apple.ca" : "doggypie",
  "a@s.com" : "p"
};



// GET REQUESTS
//checks if user is logged in if not redirects them to log in page.
//If they are it will show them the url list.
app.get('/', (req, res) => {
  if (logInCheck == false){
    res.redirect('/login');
  } else {
    res.redirect('/urls')
  };
});

//rending page for URL output.
app.get('/urls', function(req, res){
  app.locals.urlIndex = urlIndex;
  res.render('urlList');
});

//rending page for adding new URLs
app.get('/urls/new', function(req, res){
  app.locals.urlIndex = urlIndex;
  res.render('newUrl');
});


app.get('/urls/:id', function(req, res){
  const shortUrl = req.params.id;
  app.locals.key = key;
  const value = getUrlFromShort(shortUrl);
  app.locals.value = value;
  if (value != undefined) {
    res.render('urlpage');
  } else {
    res.render('404');
  }
});


//if there is a shortened URL present it will redirect to the correct website, or else will bring them to a 404 page.
app.get('/u/:id', function(req, res){
  const shortUrl = req.params.id;

  const external = getUrlFromShort(shortUrl);
  if (external != undefined) {
    res.redirect(external);
  } else {
    res.render('404');
  }
});

app.get('/login', function(req, res){
  res.render('login');
});

// POST REQUESTS
//posting form data to the URLS page
app.post('/urls', function(req, res){
  let newUrl = req.body.url;
  let key = makeId();
  app.locals.urlIndex = urlIndex;
  urlIndex[key] = newUrl;
  res.redirect('/urls/' + key)

});

//deleting URLs
app.post('/urls/:id/delete', function(req, res){
  app.locals.urlIndex = urlIndex;
  let key = req.params.id;
  console.log(key);
  delete urlIndex[key];
  res.redirect('/urls');
});

//posting url updates
app.post('/urls/:id', function(req, res){
  let key = req.params.id;
  let urlUpdate = req.body.inputField
  app.locals.urlIndex = urlIndex;
  urlIndex[key] = urlUpdate;
  res.redirect('/urls');

});

app.post('/login', function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  if (pw = userExists(username)){
    if (passCheck(pw, password)){
      res.redirect('/urls');
    }else {
      res.render('login');
    };

  }else {

  };

});

app.listen(port, () => {
  console.log(`URL Shortener App is listening on port ${port}`)
});
