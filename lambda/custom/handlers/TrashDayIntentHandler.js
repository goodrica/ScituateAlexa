'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TrashDayIntent';
    },
    handle(handlerInput) {
        // TODO: Make this dynamic - fetch from town website or API
        const speakOutput = 'Trash and recycling pickup in Scituate is typically on your scheduled day. Check your address on the town website at scituatema.gov or call the Department of Public Works at 781-545-8731 for your specific pickup schedule.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
