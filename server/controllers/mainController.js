const req = require("express/lib/request");

module.exports = {
    home: (req, res) => {
        res.render("index");
    },
};    