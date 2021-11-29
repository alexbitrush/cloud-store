const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/authRouter');
const fileRouter = require('./routes/fileRouter')
const corsMiddleware = require('./middelware/corsMiddleware');
const fileUplaod = require('express-fileupload')
const app = express();

app.use(corsMiddleware);
app.use(fileUplaod({}));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter)
const PORT = config.get('serverPort')
const start = async() => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        app.listen(PORT, () =>{
            console.log(`The server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()