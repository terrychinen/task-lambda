const AWS = require('aws-sdk');

const deleteTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB.delete({
    TableName: 'TaskTable',
    Key: {
      id,
    },
  }).promise();

  return {
    status: 200,
    body: {
      message: 'Task deleted successfully',
    }
  };
}

module.exports = {
  deleteTask,
};
