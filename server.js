const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const User = require('./migrations.js');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', async (req, res, next) => {

    try {

        let allUsers = await User.findAll();

        if (allUsers.length) {

            res.status(200).json({ data: allUsers });
        }

    } catch(err) {
        next(err);
    }

});

app.get('/users/:page/:limit', async (req, res, next) => {

    let page = req.params.page;
    let limit = req.params.limit;

    let offset = (page * limit) - limit;

    try {

        let chunkUsers = await User.findAll({ offset, limit });;

        if (chunkUsers.length) {

            res.status(200).json({ data: chunkUsers });

        }

    } catch(err) {
        next(err);
    }

});

const PORT = 3000;







app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});