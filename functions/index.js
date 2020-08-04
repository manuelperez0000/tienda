//const functions = require('firebase-functions');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const app = express();

//setings

app.set("port",process.env.PORT || 4000);
app.set("views", path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//midlewars
app.use(morgan('dev'));
app.use(express.json());


//routes----------------------
app.use(require('./routes/index.js'));

// end routes---------------

//static files
app.use(express.static(path.join(__dirname, '../public')));
 
 
//descomenta para trabajar en local

var port = app.get("port");

app.listen(port,(req, res)=>{
    console.log("Server on port",port)
})
//descomenta para trabajar con firebase
//exports.app = functions.https.onRequest(app);
