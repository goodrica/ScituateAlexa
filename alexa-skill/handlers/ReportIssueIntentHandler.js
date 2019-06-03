const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

class ReportIssueIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'ReportIssueIntent';
    }
    process() {
        let issueValue = this.slotValue('IssueType');
        if (issueValue) {
            let sessionAttributes = this.attributesManager.getSessionAttributes();
            sessionAttributes.pendingIssue = issueValue;
            let address = this.slotValue('Address');
            if (address) {
                sessionAttributes.issueAddress = address;
            }
            this.attributesManager.setSessionAttributes(sessionAttributes);
            //location services are not what we want - that's just for alexa phone app and alexa auto (car)
            //for address to work, user has to have entered it in the app
            if (sessionAttributes.issueAddress) {
                return this.templateRespond('report-confirm', {"issue-type": issueValue, "resident-address": sessionAttributes.issueAddress});
            }
            return this.callApi('v1', 'settings/address')
                .then(result => {
                    console.log('ADDRESS RESULT', result.data);
                    if (result.data.code === 'ACCESS_DENIED') { //
                        return this.handlerInput.responseBuilder
                            .speak(this.template('no-address-permission'))
                            .withShouldEndSession(false)
                            .withAskForPermissionsConsentCard(["read::alexa:device:all:address"])
                            .getResponse();
                    } else {
                        let address = result.data.addressLine1;
                        /*
                         { addressLine1: '114 BOUNDARY AVE',
  addressLine2: null,
  addressLine3: null,
  city: 'ELKINS',
  stateOrRegion: 'WV',
  districtOrCounty: null,
  countryCode: 'US',
  postalCode: '26241-4003' }
                         */
                        if (!address) {
                            return this.templateRespond('address-blank')
                        }
                        return this.templateRespond('report-confirm', {"issue-type": issueValue, "resident-address": address});
                    }
                });

        } else {
            return this.templateRespond('error');
        }

    }
}

module.exports = ReportIssueIntentHandler;