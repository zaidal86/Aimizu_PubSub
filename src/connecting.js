const { osuToken, twitch, username, channels, userid, token } = require('../config/token.json');
const W3CWebSocket = require('websocket').w3cwebsocket;
const tmi = require('tmi.js');
const osu = require('node-osu');
const { time } = require('../src/time.js');
let client = '';
const opts = { identity: { username: username, password: twitch }, channels: [channels] };
const Tclient = new tmi.client(opts);
let osuAPI = '';

function OSUConnecting() {
    const osuAPI = new osu.Api(osuToken, {
        notFoundAsError: true,
        completeScores: false
    });
    console.log('Osu API connected !');
    return osuAPI;
}

async function TMIConnecting() {

    await Tclient.on('connected', (addr, port) => { console.log(`* Connected to ${addr}:${port}`); });
    await Tclient.connect();

}


client = new W3CWebSocket('wss://pubsub-edge.twitch.tv');

client.onerror = function () {
    console.log('Connection Error');
};

client.onopen = function () {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({ "type": "LISTEN", "data": { "topics": [`channel-points-channel-v1.${userid}`], "auth_token": token } }));
    setTimeout(ping, 3 * 60 * 1000);
};

function ping() {
    if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ "type": "PING" }));
        console.log(time() + ': Ping');
    };
    setTimeout(ping, 3 * 60 * 1000);
}

TMIConnecting();
osuAPI = OSUConnecting();
module.exports = { Tclient, client, osuAPI }