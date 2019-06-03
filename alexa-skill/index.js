'use strict';

const Alexa = require('ask-sdk');
const UserDb = require('voice-tools/lib/userdb/dynamodb');
const HandlerFactory = require('./handlers/HandlerFactory');

exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
        new HandlerFactory('./LaunchRequestHandler'),
        new HandlerFactory('voice-tools/lib/platform/alexa/handlers/StopIntentHandler'),
        new HandlerFactory('voice-tools/lib/platform/alexa/handlers/HelpIntentHandler'),
        new HandlerFactory('./ReportIssueIntentHandler'),
        new HandlerFactory('./ConfirmReportIntentHandler'),
        new HandlerFactory('./CancelReportIntentHandler'),
        new HandlerFactory('./AddressIntentHandler'),
        new HandlerFactory('./TownHallHoursIntentHandler'),
        new HandlerFactory('./VeteransAgentIntentHandler')
    )
    .addErrorHandlers(
        //new HandlerFactory('voice-tools/lib/platform/alexa/handlers/ErrorHandler')
    )
    .withDynamoDbClient(new UserDb())
    .withTableName(process.env.USER_TABLE_NAME)
    .withAutoCreateTable(true)
    .lambda();