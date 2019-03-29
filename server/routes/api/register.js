const express = require('express')
const mongodb = require('mongodb')


const router = express.Router()


router.get('/', async (req, res)=>{
    const user = await connectDB();
    res.send(await user.find({}).toArray())
})

// Register User
router.post('/', async (req, res) => {
    const user = await connectDB();
    console.log(req)
    await user.insertOne({
        userDetails:req.body,
        createdAt: new Date()
    })

    res.status(201).send()
})


async function connectDB() {
    const client = await mongodb.MongoClient.connect('mongodb://admin:admin123@ds127376.mlab.com:27376/users',{
        useNewUrlParser:true
    });

    return client.db('users').collection('users'); 
}

module.exports = router;