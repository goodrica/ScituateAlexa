'use strict';

module.exports = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        console.log(`Error stack: ${error.stack}`);
        
        const speakOutput = 'Sorry, I encountered an error. Please try again.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
