const BaseHandlerFactory = require('voice-tools/lib/platform/alexa/handlers/BaseHandlerFactory');
const config = require('../config/config');
class HandlerFactory extends BaseHandlerFactory {
    constructor(handlerPath) {
        super(config);
        this.handlerClass = require(handlerPath);
    }
}

module.exports = HandlerFactory;