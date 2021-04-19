const request = require('request');
const { client_id, BearerToken, channels } = require('../config/token.json');
const { Tclient } = require('./connecting');

function vip(pseudo, callback) {

    let API1 = `https://api.twitch.tv/helix/users?login=${pseudo}`;
    const options = { 'method': 'GET', 'url': API1, 'headers': { 'Client-ID': client_id, 'Authorization': 'Bearer ' + BearerToken, 'Accept': 'application/vnd.twitchtv.v5+json' } };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        let yolo = JSON.parse(response.body).data;

        try {
            let id = yolo[0].id;

            let API2 = `https://api.twitch.tv/kraken/users/${id}/chat/channels/151011472`;
            const options2 = { 'method': 'GET', 'url': API2, 'headers': { 'Client-ID': client_id, 'Accept': 'application/vnd.twitchtv.v5+json' } };

            request(options2, function (error, response) {
                if (error) throw new Error(error);
                let vip = JSON.parse(response.body).badges[0];
                if (vip && vip.id === 'moderator') {
                    callback("moderator");
                } else if (vip && vip.id === 'vip') {
                    callback("vip");
                } else if (vip && vip.id === 'broadcaster') {
                    callback('broadcaster');
                } else {
                    callback('random');
                }
            });
        } catch (e) {
            console.log('Error user !');
            Tclient.say('#' + channels, 'User non valide !');
        };
    });
}

module.exports = { vip };