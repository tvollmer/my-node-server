var express = require( "express" );
var router = require("./app/router");
var bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.set('db', require('./app/db'));
router(app);

app.listen(port, (err) => {
	if (err) {
	    return console.log('something bad happened', err)
	  }

	  console.log(`server is listening on ${port}`)
});









