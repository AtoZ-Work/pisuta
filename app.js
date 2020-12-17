const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys');

require('./models/user')
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

//deploying program
if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//connection setup without promises

// mongoose.connect(MONGOURI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });
// mongoose.connection.on('connected',()=>{
//     console.log("connected to mongo yeah")
// })

// mongoose.connection.on('error',(err)=>{
//     console.log("error connecting", err)
// })

//connection setup using promises
mongoose.connect(MONGOURI, 
{
    useNewUrlParser: true  , 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then( () => {
    console.log("Connection Successful...");
}).catch((err) => {
    console.log("Connection Error:"+ err);
});
// NLdO8r8THMf8YdCz
// const customMiddleware = (req, res, next) =>{
//     console.log("middleware executed");
//     next();
// }

// // app.use(customMiddleware)

// app.get('/',(req,res)=>{
//     console.log('Home');
//     res.send("WElcome to Instagram Home Page")
// })

// app.get('/about',customMiddleware,(req,res)=>{
//     console.log('About');
//     res.send("WElcome to Instagram About Page")
// })

app.listen(port,()=>{
    console.log(`Server is running on: ${port}`)
})