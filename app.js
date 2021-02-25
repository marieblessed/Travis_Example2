const express = require('express');
const port = 3000;
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./phonebook.js.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.use(express.json());

app.post('/add-phone-contacts', async(req, res) => {
    try{
        const contacts = req.body;
        await admin.firestore().collection('phonecontacts').add(contacts);
        res.status(200).send({message: "Stored Contatct"});
    }catch(e){
        console.log(e);
        res.status(500).send({message: e});
    }
});

app.get('/get-contacts', async (req, res) => {
    try{
        const contacts = await admin.firestore().collection('phonecontacts').get();
        const results = [];
        contacts.forEach(contact => {
           results.push(contact.data());
        });
        res.status(200).send({message: results});
    }catch(e){
        res.status(500).send({message: e});
    }
});

app.listen(port, () => console.log(`Sever running on port ${port}`));


