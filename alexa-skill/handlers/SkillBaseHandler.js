const appPlatformUtil = require('../lib/util.js');
const appUtil = require('../../lib/util.js');
const BaseHandler = require('voice-tools/lib/platform/alexa/handlers/BaseHandler');
class SkillBaseHandler extends BaseHandler {
    constructor(handlerInput, config) {
        super(handlerInput, config);
        this.appPlatformUtils = appPlatformUtil;
        this.appUtils = appUtil;
    }
}
module.exports = SkillBaseHandler;