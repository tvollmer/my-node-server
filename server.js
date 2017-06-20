var express = require( "express" );
var router = require("./app/router");

const port = 3000;
const app = express();
router(app);

app.listen(port, (err) => {
	if (err) {
	    return console.log('something bad happened', err)
	  }

	  console.log(`server is listening on ${port}`)
});









