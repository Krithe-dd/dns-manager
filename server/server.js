const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const {app} = require('./app')

app.listen(8080,()=>{
    console.log('Listening to reqs');
})