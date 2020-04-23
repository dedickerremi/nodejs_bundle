const ping = (req, res) => {
    let test = {
      "message": "PONG"
    };
    return res.send(test);
}

module.exports = {
    ping: ping
}