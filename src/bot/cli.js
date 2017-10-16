const messages = require('./messages');

exports = module.exports = function cli(command){
    switch(command.text){
      case 'all':
        return { text: "Listing all open pull requests...", attachments: messages.formatAll(command.channel_id) };
      case 'assigned':
        return { text: "Listing all open and assigned pull requests...", attachments: messages.formatAllAssigned(command.channel_id) };
      case 'unassigned':
        return { text: "Listing all open and unassigned pull requests...", attachments: messages.formatAllUnassigned(command.channel_id) };
      case 'init':
        return { text: `Make sure to: 
            1. Add pierre to channel. 
            2. Setup Github pull request webhook with URL: https://pierre-bot.herokuapp.com/prs?channel=${command.channel_id}`
        };
      default:
        return 'Usage: /pierre [all | assigned | unassigned | init | help]';
    }
}