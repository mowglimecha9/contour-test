const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const accounts = require('./src/Assets/accounts.json')
const transaction1 = require('./src/Assets/transactions-1.json')
const transaction2 = require('./src/Assets/transactions-2.json')
const transaction3 = require('./src/Assets/transactions-3.json')
const transaction4 = require('./src/Assets/transactions-4.json')


app.use(express.static(path.join(__dirname, 'build')));

app.get('/accounts', function (req, res) {
 return res.json(accounts)
});

app.get('/accounts/1/transactions',(req,res)=> {
	return res.json(transaction1)
})
app.get('/accounts/2/transactions', (req, res) => {
	return res.json(transaction2)
})
app.get('/accounts/3/transactions', (req, res) => {
	return res.json(transaction3)
})
app.get('/accounts/4/transactions', (req, res) => {
	return res.json(transaction4)
})

console.log('Running Backend API Endpoints')
app.listen(process.env.PORT || 5000);
