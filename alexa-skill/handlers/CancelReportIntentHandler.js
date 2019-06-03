const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

class CancelReportIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'CancelReportIntent';
    }

    process() {
        let sessionAttributes = this.attributesManager.getSessionAttributes();
        delete sessionAttributes.pendingIssue;
        this.attributesManager.setSessionAttributes(sessionAttributes);
        return this.templateRespond('report-cancelled', {}, true)
    }
}

module.exports = CancelReportIntentHandler;