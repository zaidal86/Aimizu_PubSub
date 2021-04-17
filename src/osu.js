const { channels, OsuUser } = require('../config/token.json');

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

module.exports = function (osuAPI, Tclient) {

    function PP() {
        osuAPI.getUser({ u: OsuUser }).then(user => {
            Tclient.say('#' + channels, "Aimizu PP: " + financial(user.pp['raw']));
        });
    }

    function Rank() {
        osuAPI.getUser({ u: OsuUser }).then(user => {
            Tclient.say('#' + channels, 'Nom Rank sur osu : ' + user.pp['rank'] + ', Rank Pays : ' + user.pp['countryRank']);
        });
    }

    function Accuracy() {
        osuAPI.getUser({ u: OsuUser }).then(user => {
            Tclient.say('#' + channels, 'Accuracy ' + financial(user['accuracy']) + "%");
        });
    }

    return { PP, Rank, Accuracy };
}