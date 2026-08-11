'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TownHallHoursIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Scituate Town Hall is open Monday through Friday, 8 AM to 4 PM. The main office is at 116 Main Street in North Scituate. You can also visit the town website at scituatema.gov for more information.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
