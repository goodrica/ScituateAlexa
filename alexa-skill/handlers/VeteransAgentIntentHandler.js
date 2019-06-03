const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

class VeteransAgentIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'VeteransAgentIntent';
    }

    process() {
        return this.templateRespond('veterans-agent', {}, false)
    }
}

module.exports = VeteransAgentIntentHandler;