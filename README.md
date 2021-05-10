# AWS SNS - Publish notifications

Send a message to SNS Topic via GitHub Actions

## Usage

1. Set up your credentials as secrets in your repository settings using `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

2. Add the following to your workflow

```yml
- name: Publish SNS Notification
  uses: akki192/aws-sns-publish-notifications@0.0.4
  with:
    SUBJECT: "Hello"
    MESSAGE: "message"
    TOPIC_ARN: "arn:aws:sns:[REGION]:[ACCOUNT_ID]:[TOPIC_NAME]"
    ADD_GITHUB_DETAILS: "true"
  env:
    AWS_REGION: ${{ secrets.AWS_REGION }}
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Inputs

### `SUBJECT`

**Optional** This is your email subject

### `MESSAGE`

**Required** This is your serialized message

### `TOPIC_ARN`

**Required** This is the ARN of the SNS Topic you are publishing

### `ADD_GITHUB_DETAILS`

**Optional** If set to 'true', includes GitHub details like repository, branch and link to workflow in the notification

### `AWS_REGION`

A AWS Region. Can alternatively be stored in environment

### `AWS_ACCESS_KEY_ID`

A AWS Access Key ID. Can alternatively be stored in environment

### `AWS_SECRET_ACCESS_KEY`

A AWS Secret Access Key. Can alternatively be stored in environment

## Outputs

### `MessageId`

The SID of the [message resource](https://docs.aws.amazon.com/pt_br/sns/latest/dg/sns-msg-status.html) associated with the Published Topic.

## Contributing

## Third Party Licenses

This GitHub Action uses a couple of Node.js modules to work.

License and other copyright information for each module are included in the release branch of each action version under `node_modules/{module}`.

More information for each package can be found at `https://www.npmjs.com/package/{package}`

## License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
