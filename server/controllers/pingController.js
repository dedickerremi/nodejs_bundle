const ping = (req, res) => {
    let test = {
      "message": "PONG"
    };
    res.send(test);
}

module.exports = {
    ping: ping
}