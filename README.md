# Town Information and Issue Reporting Alexa Skill
This is a prototype of an Alexa skill that would allow residents
to report issues like brown water or pothole, and get information
like town hall hours, via their Alexa device.

## How to Use
This document assumes that you already have basic knowledge of how to deploy
an Alexa skill. If you do not, please see Amazon's documentation
here: https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html

1. Create your deployment package. From the root of this repository, run:
   ````
   npm install --production
   zip -r ../deployment.zip ./*
   
1. Create your content database. Create an Airtable base (airtable.com) to hold the skill content and create a table
called "UI Strings" and use the default "Grid view" it creates.
Add the content from alexa-skil/config/US_Strings-Grid_view.csv
and edit the responses as you wish
1. Set up your sendgrid account for sending email (sendgrid.com)
1. Create a skill via the Alexa Developer Console https://developer.amazon.com/alexa/console/ask
1. Go to the JSON Editor section of your skill, and paste in the file
from this repository at:
`alexa-skill/config/prod_skill/prod_phase/dialog_model.json`
1. Click `Save Model` and `Build Model`
1. Set up an AWS Lambda node.js handler for your skill, with full access
permissions to dynamodb, and 
1. Upload the deployment.zip you created in step 1 as your lambda code
1. set the lambda handler to alexa-skill/index.handler
1. Set the following environment variables:
    ```
    ENV_TYPE=prod_skill
    USER_TABLE_NAME=[TownName]
    AIRTABLE_API_KEY=[AirtableKey]
    AIRTABLE_BASE_ID=[AirtableBaseId]
    SENDGRID_API_KEY=[SendgridAPIKey]
    
    

