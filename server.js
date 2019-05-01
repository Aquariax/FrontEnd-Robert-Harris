const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(CORS());

const members = [
    {
        id: 0,
        name: 'Lucy', 
        phone: 9990042199, 
        anniversary: 'N/A', 
        birthday: '7/29/1990', 
        graduation: '6/18/2019', 
        wedding: 'N/A', 
        comment: 'set up a surprise party'
    },
    {
        id: 1, 
        name: 'Brendan',
        phone: 9968966999, 
        anniversary: 'N/A', 
        birthday: '4/10/1998', 
        graduation: '11/9/2020', 
        wedding: 'N/A', 
        comment: 'get him a new headset'
     },
    {
        id: 2,
        name: 'Leslie', 
        phone: 4344444444, 
        anniversary: 'N/A', 
        birthday: '9/16/1995', 
        graduation: '7/9/2020', 
        wedding: 'N/A', 
        comment: 'get tickets to the game for birthday' }
];

app.get('/api/members', (req, res) => {
	res.send(members);
});

app.get('/api/members/:id', (req, res) => {
	const member = members.filter(member => member.id.toString() === req.params.id)[0];
	res.status(200).json(member);
});

app.post('/api/members', (req, res) => {
	if (req.body.id !== undefined) members.push(req.body);
	res.status(201).json(members);
});

app.listen(5000, () => {
	console.log('Server listening on port 5000');
});

