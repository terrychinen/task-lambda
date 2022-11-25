const AWS = require('aws-sdk');

const getTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const result = await dynamoDB.get({
    TableName: 'TaskTable',
    Key: {
      id,
    }
  }).promise();

  const task = result.Item;

  return {
    status: 200,
    body: task,
  }
}

module.exports = {
  getTask,
}
