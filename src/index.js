// const { parse, print } = require("recast");
// console.log(print(parse(source)).code);


// console.log(recast.print(recast.parse(source)).code);
const recast = require("recast");
const fs = require("fs");
const source = fs.readFileSync('./src/example.js')

// Parse the code using an interface similar to require("esprima").parse.
// const ast = recast.parse(code);
// console.log(ast);

let recase, { parse, print } = require("recast");
const recastContent = parse(source);
// console.log('recastContent.token: ', recastContent);
attributeComments = [];

//     Punctuator
//     Identifier
//     Keyword

recast.visit(recastContent, {
    visitProperty: function (path) {
        console.log('path: ', path.value.key.name, path.value.value.name);
        console.log('comment: ', path.value.comments.map(function (c) {
            return c.value;
        }).join('\n'));
        // if (path.value.comments) {
        //     attributeComments.push({
        //         name: path.value.key.name,
        //         comments: path.value.comments.map(function (c) {
        //             return c.value;
        //         }).join('\n')
        //     });
        // }
        this.traverse(path);
    }
});

console.log(attributeComments);