const fs = require('fs');
const Module = require('./module');
const MagicString = require('magic-string');

class Bundle {
  constructor(options) {
    this.entryPath = options.entry;
  }
  build(filename) {
    let entryModule = this.fetchModule(this.entryPath);
    this.statements = entryModule.expendAllStatements();
    let { code } = this.generate();
    fs.writeFileSync(filename,code);
    
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
  generate() {
    let bundle = new MagicString.Bundle();
    this.statements.forEach((statement) => {
        bundle.addSource({
            content:statement._source.toString(),
            separator:'\n',
        })
    });
    return {code:bundle.toString()}
  }
}

module.exports = Bundle;
