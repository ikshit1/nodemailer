const express = require('express');
const path = require('path');
const app = express();
const mail = require('./routes/mail');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');

app.use('/mail', mail);
app.get('/',(req,res) => {
    res.sendFile('views/index.html', { root: __dirname });
})

app.listen(3000, () => {
    console.log('server running on port 3000');
})

module.exports = app;