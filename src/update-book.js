const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;
  const body = JSON.parse(event.body);
  console.log(body)
  const paramsName = "title";
  const paramsValue = body["title"];
  //const paramsName = body.paramName;
  //const paramsValue = body.paramValue;
  const params = {
    TableName: "books",
    Key: {
      id: id
    },
    ConditionExpression: 'attribute_exists(id)',
	UpdateExpression: 'set ' + paramsName + ' = :v',
	ExpressionAttributeValues: {
		':v': paramsValue
	},
	ReturnValues: 'ALL_NEW'
  };
  console.log(params)
  try {
    const data = await documentClient.update(params).promise();
    const response = {
      statusCode: 200
    };
    return response;
  } catch (e) {
    console.log(e)  
    return {
      statusCode: 500
    };
  }
};