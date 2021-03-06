const { osuAPI, Tclient } = require('./connecting.js');
const { channels, username } = require('../config/token.json');
const { PP, Rank, Accuracy, NP } = require('./osu.js')(osuAPI, Tclient);

function onMessageHandler(target, context, msg, self) {
    if (self) { return; }

    const commandName = msg.trim();
    if (commandName === '!pp') {
        PP();
    };

    if (commandName === '!rank') {
        Rank();
    }
    if (commandName === '!accuracy') {
        Accuracy();
    }
    if (commandName === '!np') {
        NP();
    }
    if (commandName === 'yo' || commandName === 'bonjour' || commandName === 'hey' || commandName === 'hello' || commandName === 'salut') {
        Tclient.say('#' + channels, '@' + context['display-name'] + ' KonCha');
    }
}

module.exports = { onMessageHandler }