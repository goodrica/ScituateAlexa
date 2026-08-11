'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        delete sessionAttributes.pendingIssue;
        delete sessionAttributes.issueAddress;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        const speakOutput = 'Welcome to Scituate. I can help you report town issues like potholes or brown water, get town hall hours, find veterans information, or check trash pickup days. What would you like to do?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
