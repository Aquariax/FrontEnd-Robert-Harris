const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(CORS());

const errorMessage = (message, res) =>{
    res.status(422);
    res.json({Error: message});
    return;
};

let members = [
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
	res.json(members) === req.body;
});

app.get('/api/members/:id', (req, res) => {
	const members = members.filter(member => member.id.toString() === req.params.id)[0];
	res.status(200).json(members);
});
let memberId = members.length;

app.post('/api/members', (req, res) => {
    const { name, phone, anniversary, birthday, graduation, wedding, comment } = req.body;
    const newMembers = { name, phone, anniversary, birthday, graduation, wedding, comment, id:memberId };
    if(!name || !phone || !birthday || !comment){
        return errorMessage(
            "you missed a spot",
            res
        )
    }
    res.status(201).json(members);
    
    const findMembers = member => {
        return member.name === name;
    };

    if (members.find(findMembers)){
        return errorMessage(`Friend events for ${name} already exists.`,
        res
     );
    }
    members.push(newMembers);
    memberId++;
    res.json(members);
});

app.put('/api/members/:id', (req, res) =>{
    const { id } = req.params;
    const { name, phone, anniversary, birthday, graduation, wedding, comment } = req.body;
    const getMemberId = member =>{
        return member.id == id;
    };
    const locatedMember = members.find(getMemberId);
    if (!locatedMember){
        return errorMessage("Couldn't find what you were looking for.", res );
    }else {
        if (name) locatedMember.name = name;
        if (phone) locatedMember.phone = phone;
        if (anniversary) locatedMember.anniversary = anniversary;
        if (birthday) locatedMember.birthday = birthday;
        if (graduation) locatedMember.graduation = graduation;
        if (wedding) locatedMember.wedding = wedding;
        if (comment) locatedMember.comment = comment;
        res.json(members);
    }
});

app.delete('/api/members/:id', (req, res) => {
    const {id} = req.params;
    const locatedMember = members.find(member => member.id == id);
    if (locatedMember){
        const RemovedFriend = {...locatedMember};
        members = members.filter(member => member.id != id);
        res.status(200).json(members);
    }else {
        errorMessage('No member here either', res)
    }
});

app.listen(5000, err => {
    if(err) console.log(err);
	console.log('Server listening on port 5000');
});

