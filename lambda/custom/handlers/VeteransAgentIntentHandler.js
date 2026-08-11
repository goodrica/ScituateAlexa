'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'VeteransAgentIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'The Scituate Veterans Agent can help veterans and their families access benefits and services. You can reach the Veterans Agent at Town Hall, Monday through Friday, 8 AM to 4 PM. Call 781-545-8731 for more information.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
