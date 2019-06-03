const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

class AddressIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'AddressIntent';
    }

    process() {
        let sessionAttributes = this.attributesManager.getSessionAttributes();
        if (!sessionAttributes.pendingIssue) {
            return this.templateRespond('address-no-issue', {}, false);
        }
        let address = this.slotValue('Address');
        if (!address) {
            return this.templateRespond('error');
        }
        sessionAttributes.issueAddress = address;
        this.attributesManager.setSessionAttributes(sessionAttributes);
        return this.templateRespond('report-confirm', {"issue-type": sessionAttributes.pendingIssue, "resident-address": sessionAttributes.issueAddress});

    }
}

module.exports = AddressIntentHandler;