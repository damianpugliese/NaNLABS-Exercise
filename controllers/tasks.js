const fetch = require('node-fetch');
const config = require('../config/config');
const trelloApiKey = config.TRELLO_API_KEY;
const trelloToken = config.TRELLO_TOKEN;
const { tasksTypesEnums } = require('../utils/utils');
const { addIssueCard, addBugCard, addTaskCard } = require('../helpers/helpers');

const addTask = async (req, res) => {

    const task = req.body;

    if (Object.entries(task).length === 0) return res.status(400).json({ msg: 'Task is Empty' });
    if (!task.type) return res.status(400).json({ msg: `Task type is required` });
    if(!tasksTypesEnums.includes(task.type)) return res.status(400).json({ msg: `Task type must be one of the options: ${tasksTypesEnums.join(', ')}` });

    let TODOListId;
    let membersOfTheBoard;
    let boardLabels;

    try {
        
        // Checking that at least one Boards exist and getting the Boards Ids
        const boardsResponse = await fetch(`https://api.trello.com/1/members/me/boards?key=${trelloApiKey}&token=${trelloToken}`);
        const boards = await boardsResponse.json();
        if (boards.length === 0) return res.status(400).json({ msg: "There isn't any Board Created. You must to create one" });
        const boardsIds = boards.map(board => board.id);

        // Checking that the TO DO list exist and getting the Id

        const lists = [];

        for (let id of boardsIds) {
            const listResponse = await fetch(`https://api.trello.com/1/boards/${id}/lists?key=${trelloApiKey}&token=${trelloToken}`);
            const listsByBoard = await listResponse.json();
            listsByBoard.forEach(listByBoard => {
                lists.push(listByBoard);
            })
        }

        const TODOList = lists.filter(list => list.name === 'TO DO');

        if (TODOList.length === 0) return res.status(400).json({ msg: 'TO DO list does not exist in any board. You must to create a list with name "TO DO"' });

        TODOListId = TODOList[0].id;

        // Getting members of the board

        const currentBoardResponse = await fetch(`https://api.trello.com/1/lists/${TODOListId}/board?key=${trelloApiKey}&token=${trelloToken}`);
        const currentBoard = await currentBoardResponse.json();
        membersOfTheBoard = currentBoard.memberships;

        // Getting labels of the board

        const boardLabelsResponse = await fetch(`https://api.trello.com/1/boards/${currentBoard.id}/labels?key=${trelloApiKey}&token=${trelloToken}`);
        boardLabels = await boardLabelsResponse.json();

    } catch (err) {

        res.status(400).json({ msg: "Oops! Something went wrong. Please try again!" });;

    }
  
    switch (task.type) {
        case 'issue':
            addIssueCard(task, TODOListId, res);
        case 'bug':
            addBugCard(task, TODOListId, membersOfTheBoard, boardLabels, res);
        case 'task':
            addTaskCard(task, TODOListId, boardLabels, res);
    }

}

module.exports = {
    addTask
}