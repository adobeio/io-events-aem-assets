# Adobe I/O Events - AEM Assets Demo

This package provides you with a simple webhook provider that allows you to create webhooks urls dynamically and observe activities on webhook based on path in real time. Furthermore, you can update the slack path to send message into your own slack channel for each AEM Assets event update. 

1. [Set Up AEM Events](#AEM-Setup)

1. [Install Solution](#Install)

1. [Watch the Solution Work](#Watch-It-Work)

## <a name="AEM-Setup">Set Up AEM Events</a>
Please refer to [AEM Set up Documentation](https://github.com/adobeio/solutions-ioevents-aem-setup-documentation)

## <a name="Install">Install Solution</a>

### Local/Server deployment
```sh
$ npm install
$ npm start
```

### Hosting on heroku

```sh
$ cd webhooks-provider
$ heroku login
$ heroku create
$ git push heroku master
$ heroku open
```

## <a name="Watch-It-Work">Watch the Solution Work</a>

### Subscribe to webhook events via URL 

- Establish connection using the following steps:

<img
alt="listen to webhooks" src="https://cloud.githubusercontent.com/assets/273188/21304884/362deb14-c5ee-11e6-8886-dade49032957.gif" width="500" />

- Create a webhook with custom name e.g. "hello" and click on Connect.
- A webhook will be created at http://localhost:8080/webhook/hello (local) or http://yourappname.herokuapp.com/webhook/hello (Heroku)
- Open the Adobe I/O Console
- Go back to the Integration click Events->Add Webhook and use this new webhook URL e.g. (http://yourappname.herokuapp.com/webhook/hello)
- Webhook will start listening the events from AEM. You should be able to see your AEM Asset Event updates posted here

<img
alt="listen to webhooks" src="https://cloud.githubusercontent.com/assets/273188/21348596/dbfae0fc-c6d3-11e6-87fb-04c2bdc2e139.png" width="500" />

### Update Slack Incoming Webhook
- Set up an Incoming Webhooks for your team: https://api.slack.com/incoming-webhooks
- Update the slackWebhook and slackChannel variable in public/javascripts/app.js to the link and channel that you just set up
- You should be able to see slack updates now

# Contributors
- Sarah Xu [@sarahxxu](https://github.com/sarahxxu).
- Arjun Raj [@rajarju](https://github.com/rajarju).
- Hiren Shah [@hirenshah111](https://github.com/hirenshah111).

# License
[MIT](LICENSE)
