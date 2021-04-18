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

    function NP() {
        osuAPI.getUserRecent({ u: 'Argonaute' }).then(scores => {
            let beatmaps = scores[0].beatmapId;
            osuAPI.getBeatmaps({ b: beatmaps }).then(beatmaps => {
                Tclient.say('#' + channels, 'The Beatmaps is: [' + beatmaps[0].approvalStatus + '] ' + beatmaps[0].title + ' [' + beatmaps[0].version + '] (by ' +
                    beatmaps[0].creator + '), ' + beatmaps[0].bpm + ' BPM, ' + financial(beatmaps[0].difficulty.rating) + '*' + ' https://osu.ppy.sh/beatmapsets/' +
                    beatmaps[0].beatmapSetId + '#osu/' + beatmaps[0].id);
            });
        });
    }

    return { PP, Rank, Accuracy, NP };
}