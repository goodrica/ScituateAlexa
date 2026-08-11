'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AddressIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const address = handlerInput.requestEnvelope.request.intent.slots.Address.value;
        
        if (!sessionAttributes.pendingIssue) {
            const speakOutput = 'I don\'t have a pending issue. What would you like to report?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        if (!address) {
            const speakOutput = 'I didn\'t catch the address. What\'s the address?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        sessionAttributes.issueAddress = address;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        const speakOutput = `I have ${sessionAttributes.pendingIssue} at ${address}. Should I submit this report?`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Should I submit this report?')
            .getResponse();
    }
};
