'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TownMeetingIntent';
    },
    handle(handlerInput) {
        // TODO: Make this dynamic - fetch from town website or API
        const speakOutput = 'Scituate Town Meeting dates vary throughout the year. Check the town website at scituatema.gov or call Town Hall at 781-545-8731 for the next scheduled Town Meeting date and agenda.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
