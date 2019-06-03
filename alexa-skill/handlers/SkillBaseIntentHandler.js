const SkillBaseHandler = require('./SkillBaseHandler');
class SkillBaseIntentHandler extends SkillBaseHandler {
    static requestType() {
        return 'IntentRequest';
    }
}
module.exports = SkillBaseIntentHandler;