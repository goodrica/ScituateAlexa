const SkillBaseHandler = require('./SkillBaseHandler');

class LaunchRequestHandler extends SkillBaseHandler {
    static requestType() {
        return 'LaunchRequest';
    }
    // superclass handle method calls before(), process(), after()
    process() {
        console.log('LAUNCH REQUEST');
        let sessionAttributes = this.attributesManager.getSessionAttributes();
        delete sessionAttributes.pendingIssue;
        delete sessionAttributes.issueAddress;
        this.attributesManager.setSessionAttributes(sessionAttributes);
        return this.templateRespond('welcome-new');
    }
}

module.exports = LaunchRequestHandler;