const core = require('@actions/core');
const AWS = require('aws-sdk');

function execute() {
  try{
    const AWS_REGION = core.getInput("AWS_REGION") || process.env.AWS_REGION;
    const AWS_ACCESS_KEY_ID = core.getInput("AWS_ACCESS_KEY_ID") || process.env.AWS_ACCESS_KEY_ID;
    const AWS_SECRET_ACCESS_KEY = core.getInput("AWS_SECRET_ACCESS_KEY") || process.env.AWS_SECRET_ACCESS_KEY;
    
    const MESSAGE = core.getInput("MESSAGE");
    const SUBJECT = core.getInput("SUBJECT");
    const TOPIC_ARN = core.getInput("TOPIC_ARN");

    AWS.config.update({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

    core.debug(MESSAGE);
    
    const params = {
      Message: MESSAGE,
      TopicArn: TOPIC_ARN
    };
    if (SUBJECT) {
      params.Subject = SUBJECT;
    }

    const awsClient = new AWS.SNS({ apiVersion: "2010-03-31" });

    awsClient.publish(params, function(err, data) {
      if (err) {
        core.debug(err.Message);
        core.setFailed(err.Message); 
      }
      else {
        core.debug("Published Message!");
        return data.MessageId;
      }
    });
  } catch(error) {
    core.debug(err.Message);
    core.setFailed(error.message);
  }
}

execute();