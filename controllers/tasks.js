const fetch = require('node-fetch');
const config = require('../config/config');
const trelloApiKey = config.TRELLO_API_KEY;
const trelloToken = config.TRELLO_TOKEN;

const addTask = async (req, res) => {

    let task = req.body;

    if (!task) return res.status(400).json({ msg: 'Oops! Somethig went wrong. Please try again' });

    res.status(200).send(task);

}

module.exports = {
    addTask
}