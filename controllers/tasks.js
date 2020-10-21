const fetch = require('node-fetch');
const config = require('../config/config');
const trelloApiKey = config.TRELLO_API_KEY;
const trelloToken = config.TRELLO_TOKEN;
const { addIssue } = require('../helpers/helpers');

const addTask = async (req, res) => {

    let task = req.body;

    if (!task) return res.status(400).json({ msg: 'Object Task is Empty' });

    fetch(`https://api.trello.com/1/members/me/boards?key=${trelloApiKey}&token=${trelloToken}`)
        .then(response => response.json())
        .then(boards => {
            if (boards.length === 0) return res.status(400).json({ msg: "There isn't any Board Created. You must to create one" });
            let boardsIds = boards.map(board => board.id);
            console.log(boardsIds);
        })
        .catch(err => console.log(err));



    // switch (task.type) {
    //     case "issue":
    //         addIssue(task, res);
    // }

}

module.exports = {
    addTask
}