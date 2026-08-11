'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CancelReportIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        delete sessionAttributes.pendingIssue;
        delete sessionAttributes.issueAddress;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = 'Report cancelled. What else can I help you with?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
