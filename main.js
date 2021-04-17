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
        let user = NameOfReward.data.redemption.user_input;

        if (title !== undefined) {
          vip(name, function (str) {
            console.log(time() + ' ' + title + ' : ' + name + ' is ' + str + ' claim reward');
          });
        };

        if (title === "Bannissez temporairement quelqu'un") {
          Tclient.say('#' + channels, "/timeout " + user + " 120" + " On a payé pour te bannir alors pars " + user.replace('@', ' '));
        };
      };
    };
  };
};