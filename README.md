# Pierre

A Slack-bot for Pull Request notifications

### Server

The server is the connection between Github webhooks, Slack webhooks, Slack Slash Commands, and the bot itself. It listens for the specified POST events and responds or makes requests of its own.

The app is currently using Heroku until it can be hosted internally: https://dashboard.heroku.com/apps/pierre-bot

It is set up for continuous integration and will redeploy if there are changes to this master branch

### Github Webhooks

The server listens for incoming payloads from the Github webhooks
- The webhooks are manually setup by the end user (copy/paste URL from `/pierre init`)
- The server ignores all payloads that aren't a "pull-request" event

See [the Github doc](https://developer.github.com/v3/activity/events/types/#pullrequestevent) on payload structure.

### Slack App

The Slack App is basically a permissions / initialization bundle. 
- Once installed to the workspace, users will be able to use the `/pierre` Slash Command. 
- The bot will be available to add to channels, and will have its OATH token generated. 
- Various Slack events (messaging, user events, etc) can be subscribed to on the server.

https://api.slack.com/apps/A7FKQ4KCP/oauth

### Slack Slash Commands

The bot will make posts when certain events happen (ex: pull requests are opened). The Slack command line tool can be used to query the server anytime.

Usage:
- `/pierre all`
  List all of the opened pull requests for this channel's repo
- `/pierre assigned`
  List all of the opened and assigned pull requests for this channel's repo
- `/pierre unassigned`
  List all of the opened but unassigned pull requests for this channel's repo
- `/pierre init`
  Display instructions for fully integrating a Github repo with this channel
- `/pierre help`
  Display a usage message
  
