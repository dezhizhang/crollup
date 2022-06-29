
const Bundle = require('./bundle.js');

function rollup(entry,filename) {
    const bundle = new Bundle({entry});

}

module.exports = rollup;
