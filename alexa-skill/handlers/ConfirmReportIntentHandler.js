const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');
const AWS = require('aws-sdk');

class ConfirmReportIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'ConfirmReportIntent';
    }

    sendEmail(issueType, address) {
        let templateData = {
            'issue-type': issueType,
            'resident-address': address
        };

        const params = {
            Destination: {
                ToAddresses: [this.template('email-to')]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: this.template('email-text', templateData)
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: this.template('email-subject', templateData)
                }
            },
            Source: this.template('email-from')
        };

        return new AWS.SES({ apiVersion: "2010-12-01", region: "us-east-1" })
            .sendEmail(params)
            .promise();
    }

    process() {
        let sessionAttributes = this.attributesManager.getSessionAttributes();
        let address = sessionAttributes.issueAddress;
        if (!address) {
            return this.catchRespond('no-address', null);
        }
        let issueType = sessionAttributes.pendingIssue;
        if (!issueType) {
            return this.catchRespond('reprompt-for-issue', null);
        }

        return this.sendEmail(issueType, address)
            .then(result => {
                console.log(result);
                delete sessionAttributes.pendingIssue;
                this.attributesManager.setSessionAttributes(sessionAttributes);
                return this.templateRespond('report-sent', {}, true)
            })
            .catch(err => {
                delete sessionAttributes.pendingIssue;
                this.attributesManager.setSessionAttributes(sessionAttributes);
                return this.catchRespond(this.template('error'), err);
            });
    }
}

module.exports = ConfirmReportIntentHandler;
