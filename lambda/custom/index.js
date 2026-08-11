'use strict';

const Alexa = require('ask-sdk-core');
const sgMail = require('@sendgrid/mail');

// Handlers
const LaunchRequestHandler = require('./handlers/LaunchRequestHandler');
const HelpIntentHandler = require('./handlers/HelpIntentHandler');
const CancelAndStopIntentHandler = require('./handlers/CancelAndStopIntentHandler');
const ReportIssueIntentHandler = require('./handlers/ReportIssueIntentHandler');
const ConfirmReportIntentHandler = require('./handlers/ConfirmReportIntentHandler');
const CancelReportIntentHandler = require('./handlers/CancelReportIntentHandler');
const AddressIntentHandler = require('./handlers/AddressIntentHandler');
const TownHallHoursIntentHandler = require('./handlers/TownHallHoursIntentHandler');
const VeteransAgentIntentHandler = require('./handlers/VeteransAgentIntentHandler');
const TrashDayIntentHandler = require('./handlers/TrashDayIntentHandler');
const TownMeetingIntentHandler = require('./handlers/TownMeetingIntentHandler');
const SessionEndedRequestHandler = require('./handlers/SessionEndedRequestHandler');
const ErrorHandler = require('./handlers/ErrorHandler');

// Initialize Sendgrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        ReportIssueIntentHandler,
        ConfirmReportIntentHandler,
        CancelReportIntentHandler,
        AddressIntentHandler,
        TownHallHoursIntentHandler,
        VeteransAgentIntentHandler,
        TrashDayIntentHandler,
        TownMeetingIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
