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
    const ADD_GITHUB_DETAILS = core.getInput("ADD_GITHUB_DETAILS") || 'false';

    AWS.config.update({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

    core.debug(MESSAGE);

    let message = {
      message: MESSAGE
    };

    const gitParams = {
      repository: process.env.GITHUB_REPOSITORY,
      branch: process.env.GITHUB_REF,
      workflowUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    };
    
    if (ADD_GITHUB_DETAILS) {
      message = { ...message, ...gitParams };
    }

    core.debug(message);
    
    const params = {
      Message: JSON.stringify(message),
      TopicArn: TOPIC_ARN
    };
    if (SUBJECT) {
      params.Subject = SUBJECT;
    }

    const awsClient = new AWS.SNS({ apiVersion: "2010-03-31" });

    awsClient.publish(params, function(err, data) {
      if (err) {
        core.error(err.Message);
        core.setFailed(err.Message); 
      } else {
        core.debug("Published Message!");
        return data.MessageId;
      }
    });
  } catch(error) {
    core.error(error.Message);
    core.setFailed(error.message);
  }
}

execute();
