'use strict';

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ReportIssueIntent';
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        const issueType = request.intent.slots.IssueType ? request.intent.slots.IssueType.value : null;
        const address = request.intent.slots.Address ? request.intent.slots.Address.value : null;
        
        if (!issueType) {
            const speakOutput = 'What type of issue would you like to report?';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        sessionAttributes.pendingIssue = issueType;
        
        if (address) {
            sessionAttributes.issueAddress = address;
            const speakOutput = `I have ${issueType} at ${address}. Should I submit this report?`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Should I submit this report?')
                .getResponse();
        }
        
        // Try to get device address
        try {
            const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
            const apiAccessToken = handlerInput.requestEnvelope.context.System.apiAccessToken;
            const apiEndpoint = handlerInput.requestEnvelope.context.System.apiEndpoint;
            
            const addressResponse = await fetch(`${apiEndpoint}/v1/devices/${deviceId}/settings/address`, {
                headers: {
                    'Authorization': `Bearer ${apiAccessToken}`
                }
            });
            
            if (addressResponse.ok) {
                const addressData = await addressResponse.json();
                if (addressData.addressLine1) {
                    const fullAddress = `${addressData.addressLine1}, ${addressData.city}, ${addressData.stateOrRegion} ${addressData.postalCode}`;
                    sessionAttributes.issueAddress = fullAddress;
                    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
                    
                    const speakOutput = `I have ${issueType} at ${fullAddress}. Should I submit this report?`;
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt('Should I submit this report?')
                        .getResponse();
                }
            }
        } catch (error) {
            console.log('Address error:', error);
        }
        
        // No address available
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        const speakOutput = `I have ${issueType}. What's the address?`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What\'s the address?')
            .getResponse();
    }
};
