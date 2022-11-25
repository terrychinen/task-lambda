const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require('middy/http-json-body-parser');

const addTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { title, description } = event.body;
  const createdAt = new Date();
  const id = v4();

  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false,
  };

  await dynamoDB.put({
    TableName: 'TaskTable',
    Item: newTask,
  }).promise();

  return {
    status: 200,
    body: JSON.stringify(newTask)
  };
}

module.exports = {
  addTask: middy(addTask).use(jsonBodyParser()),
};
