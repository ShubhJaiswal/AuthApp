

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')
const db = `mongodb://usershubham:usershubham1@ds021046.mlab.com:21046/eventdb`;
const jwt = require('jsonwebtoken');
mongoose.connect(db, {
    useNewUrlParser: true
},
    err => {
        if (err) {
            console.error('Error: ' + err)
        }
        else {
            console.log('Connected to MongoDb')
        }
    })

router.get('/', (req, res) => {
    res.send('From API route')
});

function verifyToken(req, res , next) { 
    if(!req.headers.authorization) {
       return res.status('401').send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status('401').send('Unauthorized request')
    }

    let  payload = jwt.verify(token, 'secretKey')
    if( !payload){
        return res.status('401').send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid Email');
            } else if (user.password != userData.password) {
                res.status(401).send('Invalid Password');
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token });
            }
        }
    })
});

router.get('/events', (req, res) => {
    let events = [
        {
            "title": "Cental Apartment 1",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 2",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 3",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }, {
            "title": "Cental Apartment 4",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 5",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 6",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 7",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }, {
            "title": "Cental Apartment 8",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }
    ];

    res.json(events);
});

router.get('/special', verifyToken,  (req, res) => {
    let events = [
        {
            "title": "Cental Apartment 1",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 2",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 3",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }, {
            "title": "Cental Apartment 4",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 5",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 6",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        },
        {
            "title": "Cental Apartment 7",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }, {
            "title": "Cental Apartment 8",
            "city": "delhi",
            "street": "Red Fort",
            "category": "apartment",
            "image": "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
            "bedrooms": 6,
        }
    ];

    res.json(events);
});
module.exports = router;