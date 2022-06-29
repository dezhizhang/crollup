const fs = require('fs');
const Module = require('./module');

class Bundle {
  constructor(options) {
    this.entryPath = options.entry;
  }
  build(filename) {
    let entryModule = this.fetchModule(this.entryPath);
  }
  fetchModule(importee) {
    const route = importee;
    if(route) {
        let code = fs.readFileSync(route,'utf-8');
        const module = new Module({
            code,
            path:route,
            bundle:this
        });
        return module
    }
  }
}

module.exports = Bundle;
