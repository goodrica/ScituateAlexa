# Scituate Alexa Skill

Town information and issue reporting for Scituate, MA residents.

## Features

- **Report Issues**: Report potholes, brown water, streetlight outages, fallen trees
- **Town Hall Hours**: Get town hall operating hours
- **Veterans Agent**: Contact information for the Scituate Veterans Agent
- **Trash Day**: Check trash and recycling pickup information
- **Town Meeting**: Get information about upcoming town meetings

## Setup

### Prerequisites

1. Install ASK CLI v2:
   ```bash
   npm install -g ask-cli
   ```

2. Configure AWS credentials:
   ```bash
   ask configure
   ```

3. Install dependencies:
   ```bash
   cd lambda/custom
   npm install
   ```

### Environment Variables

Set these in your Lambda environment or in `.env` for local testing:

- `SENDGRID_API_KEY` - SendGrid API key for email notifications
- `REPORT_EMAIL_TO` - Email address to receive issue reports (default: town@scituatema.gov)
- `REPORT_EMAIL_FROM` - From address for reports (default: alexa@scituatema.gov)

### Deploy

```bash
ask deploy
```

### Test

```bash
ask dialog --locale en-US
```

## Project Structure

```
ScituateAlexa/
├── ask-resources.json          # ASK CLI v2 config
├── skill-package/
│   ├── skill.json              # Skill manifest
│   └── interactionModels/
│       └── en-US.json          # Interaction model (intents, slots, utterances)
└── lambda/
    └── custom/
        ├── index.js            # Main handler
        ├── package.json        # Dependencies
        └── handlers/           # Intent handlers
            ├── LaunchRequestHandler.js
            ├── ReportIssueIntentHandler.js
            ├── ConfirmReportIntentHandler.js
            └── ...
```

## Development

### Add New Intent

1. Add intent to `skill-package/interactionModels/en-US.json`
2. Create handler in `lambda/custom/handlers/`
3. Register handler in `lambda/custom/index.js`
4. Deploy with `ask deploy`

### Local Testing

Use the ASK CLI simulator:
```bash
ask dialog --locale en-US
```

Or test on your Echo device after enabling the skill in the Alexa Developer Console.

## Migration from v1

This is a complete rewrite of the original skill. Changes:

- **Removed**: `voice-tools` dependency (private repo, no longer accessible)
- **Upgraded**: From `ask-sdk` v1 to `ask-sdk-core` v2
- **Modernized**: ASK CLI v2 project structure
- **Added**: New intents (TrashDay, TownMeeting, more issue types)
- **Simplified**: Removed Airtable integration (can be re-added if needed)

## License

MIT
