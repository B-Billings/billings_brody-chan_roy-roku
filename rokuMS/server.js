const express = require('express');
const app = express();
const port =process.env.PORT || 5050;

//config incoming data payloads
//via our routes the user data we pass in our fetch call in the logincomponent
//we can use a json encoded obj to form data
app.use(express.json());
app.unsubscribe(express.urlencoded({extended: false}));
app.use('/ums', require('./routes/api'));

app.listen(port,()=>{
    console.log(`ums is running at port ${port}`);
})