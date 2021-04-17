function time() {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * +2));
    return nd.toLocaleString();
};

module.exports = { time };