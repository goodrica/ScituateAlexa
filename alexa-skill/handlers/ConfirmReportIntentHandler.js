const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

const sgMail = require('@sendgrid/mail');
// const AWS = require('aws-sdk');
//
// AWS.config.update({
//     region: "us-east-1",
//     //endpoint: "http://localhost:4000",
//     credentials: {
//         accessKeyId: process.env.AWS_KEY,
//         secretAccessKey: process.env.AWS_SECRET
//     }
// });

// create reusable transporter object using the default SMTP transport


class ConfirmReportIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'ConfirmReportIntent';
    }

    sendEmail(issueType, address) {
        let templateData = {
            'issue-type': issueType,
            'resident-address': address
        };

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: this.template('email-to'),
            from: this.template('email-from', templateData),
            subject: this.template('email-subject', templateData),
            text: this.template('email-text', templateData)
            //,
            //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        let out = sgMail.send(msg);
        return out;

/*
        // Create sendEmail params
        const params = {
            Destination: {
                ToAddresses: [this.template('email-to')]
            },
            Message: {
                Body: {
                    //   Html: {
                    //     Charset: "UTF-8",
                    //     Data: htmlBody
                    //   },
                    Text: {
                        Charset: "UTF-8",
                        Data: 'scituate test subject', //this.template('email-text')
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: 'scituate test body' //this.template('email-subject')
                }
            },
            Source: 'jim@eonconnect.com' //this.template('email-from')
        };

        // Create the promise and SES service object
        const sendPromise = new AWS.SES({apiVersion: "2010-12-01"})
            .sendEmail(params)
            .promise();

        // Handle promise's fulfilled/rejected states
        return sendPromise;
        */
    }

    process() {
        let sessionAttributes = this.attributesManager.getSessionAttributes();
        let address = sessionAttributes.issueAddress;
        if (!address) {
            return this.templateRespond
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