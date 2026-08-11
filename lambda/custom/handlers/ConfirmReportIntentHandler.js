'use strict';

const sgMail = require('@sendgrid/mail');

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ConfirmReportIntent';
    },
    async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const issueType = sessionAttributes.pendingIssue;
        const address = sessionAttributes.issueAddress;
        
        if (!issueType) {
            const speakOutput = 'I don\'t have an issue to submit. What would you like to report?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        if (!address) {
            const speakOutput = 'I need an address to submit the report. What\'s the address?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        // Send email via SendGrid
        if (!process.env.SENDGRID_API_KEY) {
            console.error('SendGrid API key not configured');
            const speakOutput = 'Sorry, the reporting system is not configured. Please contact the town directly.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        
        try {
            const msg = {
                to: process.env.REPORT_EMAIL_TO || 'town@scituatema.gov',
                from: process.env.REPORT_EMAIL_FROM || 'alexa@scituatema.gov',
                subject: `Scituate Issue Report: ${issueType}`,
                text: `Issue: ${issueType}\nAddress: ${address}\nReported via Alexa skill`,
            };
            
            await sgMail.send(msg);
            
            delete sessionAttributes.pendingIssue;
            delete sessionAttributes.issueAddress;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            
            const speakOutput = `Your report has been submitted. Thank you!`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } catch (error) {
            console.error('SendGrid error:', error);
            delete sessionAttributes.pendingIssue;
            delete sessionAttributes.issueAddress;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            
            const speakOutput = 'Sorry, I couldn\'t submit your report. Please try again or contact the town directly.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};
