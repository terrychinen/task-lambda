const AWS = require('aws-sdk');

const getTasks = async (event) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const result = await dynamoDB.scan({
      TableName: 'TaskTable'
    }).promise();

    const tasks = result.Items;
    console.log(tasks);

    return {
      status: 200,
      body: {
        tasks,
      },
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTasks
};
