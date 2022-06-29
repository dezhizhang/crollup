
const MagicString = require('magic-string');
const acorn = require('acorn');

class Module{
    constructor({code,path,bundle}) {
        this.code = new MagicString(code,{finename:path});
        this.ast = acorn.parse(code,{ecmaVersion:8,sourceType:'module'});
    }
    expendAllStatements() {
        let allStatements = [];
        this.ast.body.forEach(statement => {
            let statements = this.expandStatement(statement);
            allStatements.push(...statements)
        });
        return allStatements;

    }

    expandStatement(statement) {
        let result = [];
        statement._included = true;
        result.push(statement);
        return result;
    }
}

module.exports = Module;
