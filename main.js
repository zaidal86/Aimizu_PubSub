const { Tclient, client } = require('./src/connecting.js');
const { userid, channels } = require('./config/token.json');
const { onMessageHandler } = require('./src/onMessage.js');
const { vip } = require('./src/vip.js');
const { time } = require('./src/time.js');

Tclient.on('message', onMessageHandler);

client.onmessage = async function (e) {
  if (typeof e.data === 'string') {
    var data = JSON.parse(e.data);
    const type = data;
    if (type.type === "MESSAGE") {
      if (type.data.topic === `channel-points-channel-v1.${userid}`) {
        var NameOfReward = JSON.parse(type.data.message);

        let title = NameOfReward.data.redemption.reward.title;
        let name = NameOfReward.data.redemption.user.display_name;

        if (title !== undefined) {
          vip(name, function (str) {
            console.log(time() + ' ' + title + ' : ' + name + ' is ' + str + ' claim reward');
          });
        };

        if (title === "Bannissement temporaire") {
          let user = NameOfReward.data.redemption.user_input.split(/ +/);
          let username = user[0].replace('@', '');
          vip(username, function (str) {
            console.log('Grade: ' + str + " l'utilisateur qui a utilisé ces points de chaine: " + name + ' return tab replace @ ', user, ' le pseudo du ban ' + username);
            if (str === 'moderator') {
              Tclient.say('#' + channels, "/timeout " + name + " 120" + " C'est pas bien de vouloir ban un modo !");
              Tclient.say('#' + channels, name + " à été ban parce qu'il voulait ban un modo !");
              console.log('ban moderator');
            } else if (str === 'broadcaster') {
              Tclient.say('#' + channels, "/timeout " + name + " 120" + " C'est pas bien de vouloir ban la streameuse !");
              Tclient.say('#' + channels, name + " à été ban parce qu'il voulait ban la streameuse !");
              console.log('ban broadcaster');
            } else {
              Tclient.say('#' + channels, "/timeout " + username + " 120" + " On a payé pour te bannir, alors pars " + username);
              Tclient.say('#' + channels, username + " à été banni");
              console.log('ban random');
            }
          });
        };
      };
    };
  };
};