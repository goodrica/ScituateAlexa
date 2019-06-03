const SkillBaseIntentHandler = require('./SkillBaseIntentHandler');

class TownHallHoursIntentHandler extends SkillBaseIntentHandler {
    static intentName() {
        return 'TownHallHoursIntent';
    }

    process() {
        return this.templateRespond('town-hall-hours', {}, false)
    }
}

module.exports = TownHallHoursIntentHandler;