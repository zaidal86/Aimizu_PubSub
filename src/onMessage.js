const { osuAPI, Tclient } = require('./connecting.js');
const { PP, Rank, Accuracy } = require('./osu.js')(osuAPI, Tclient);

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
}

module.exports = { onMessageHandler }