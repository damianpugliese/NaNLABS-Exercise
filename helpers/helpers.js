const fetch = require('node-fetch');
const config = require('../config/config');
const trelloApiKey = config.TRELLO_API_KEY;
const trelloToken = config.TRELLO_TOKEN;
const { categories } = require('../utils/utils');

const addIssueCard = async (task, TODOListId, res) => {

    const { title, description } = task;

    if (!title || !description) return res.status(400).json({ msg: 'title and description are required' });

    try {

        const cardResponse = await fetch(`https://api.trello.com/1/cards?key=${trelloApiKey}&token=${trelloToken}&name=${title}&desc=${description}&idList=${TODOListId}`, {
            method: 'POST'
        });
    
        if (cardResponse.status === 200) return res.status(200).json({ msg: 'Card Successfully created' });

    } catch(err) {

        res.status(400).json({ msg: "Oops! Something went wrong. Please try again!" });;

    }


}

const addBugCard = async (task, TODOListId, membersOfTheBoard, boardLabels, res) => {

    // Checking that description exist
    const { description } = task;

    if (!description) return res.status(400).json({ msg: 'description are required' });

    // Checking that at least one member exist and asign a random member to the task
    if(membersOfTheBoard.length === 0) return res.status(400).json({ msg: 'There is no members in the current board. Please create one at least' })

    const title = `bug-fix-${Math.floor(Math.random() * 1000)}`;

    const randomMemberId = membersOfTheBoard[Math.floor(Math.random() * membersOfTheBoard.length)].id;

    // Checking that the Bug label exist and asign the Bug label to the Card
    const labelBug = boardLabels.filter(boardLabel => boardLabel.name === 'Bug');

    if (labelBug.length === 0) return res.status(400).json({ msg: 'Label "Bug" does not exist. Please create a label with the name "Bug"' });

    const labelBugId = labelBug[0].id;

    try {
        
        const cardResponse = await fetch(`https://api.trello.com/1/cards?key=${trelloApiKey}&token=${trelloToken}&name=${title}&desc=${description}&idList=${TODOListId}&idMembers=${[randomMemberId]}&idLabels=${[labelBugId]}`, {
            method: 'POST'
        });
    
        if (cardResponse.status === 200) return res.status(200).json({ msg: 'Card Successfully created' });

    } catch(err) {

        res.status(400).json({ msg: "Oops! Something went wrong. Please try again!" });;

    }


}

const addTaskCard = async (task, TODOListId, boardLabels, res) => {

    const { title, category } = task;

    if (!title || !category) return res.status(400).json({ msg: 'title and category are required' });

    if(!categories.includes(category)) return res.status(400).json({ msg: `Task category must be one of the options: ${categories.join(', ')}` });

    // Checking that the Category label exist and asign the Category label to the Card
    const categoryLabel = boardLabels.filter(boardLabel => boardLabel.name === `${category}`);

    if (categoryLabel.length === 0) return res.status(400).json({ msg: `Label ${category} does not exist. Please create a label with the name ${category}` });

    const categoryId = categoryLabel[0].id;

    try {
        
        const cardResponse = await fetch(`https://api.trello.com/1/cards?key=${trelloApiKey}&token=${trelloToken}&name=${title}&idList=${TODOListId}&idLabels=${[categoryId]}`, {
            method: 'POST'
        });
    
        if (cardResponse.status === 200) return res.status(200).json({ msg: 'Card Successfully created' });

    } catch (err) {

        res.status(400).json({ msg: "Oops! Something went wrong. Please try again!" });;

    }


}

module.exports = {
    addIssueCard,
    addBugCard, 
    addTaskCard
}