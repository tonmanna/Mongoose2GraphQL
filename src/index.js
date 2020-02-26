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
// attributeComments = [];
//     Punctuator
//     Identifier
//     Keyword
// Grab a reference to the function declaration we just parsed.
// console.log('recastContent.program: ', recastContent.program);

recastContent.program.body.map((element, index) => {
    var b = recast.types.builders
    switch (element.type) {
        case "ExpressionStatement":
            recastContent.program.body[index] = b.emptyStatement();
            break;
        case "VariableDeclaration":
            let declaration = element.declarations[0];
            let isRequireDeclaration = declaration.init.callee.name == "require";
            if (!isRequireDeclaration) {
                // let isNewMongooseSchemadeclaration = declaration.init.callee.
                let declarationName = declaration.id.name
                let argumentProperties = declaration.init.arguments[0].properties;
                recastContent.program.body[index] = "type " + declarationName + " {"
                recastContent.program.body[index] += "}"
            } else {
                recastContent.program.body[index] = b.emptyStatement();
            }
            break;
        default:
    }
    return element
});

var output = recast.prettyPrint(recastContent, { tabWidth: 2 }).code;
console.log(output);

// var add = recastContent.program.body[0];
// var b = recast.types.builders; // builders help build AST nodes
// // declare a var with the same name as the function
// recastContent.program.body[0] = b.variableDeclaration("var", [
//     b.variableDeclarator(add.id, b.functionExpression(
//         null, // Anonymize the function expression.
//         add.params, // params
//         add.body // and body are left unchanged
//     ))
// ]);
// Just for fun, because addition is commutative:
// add.params.push(add.params.shift());
// var output = recast.prettyPrint(recastContent, { tabWidth: 2 }).code;
// console.log(output);
// recast.visit(recastContent, {
    // visitProperty: function (path) {
    //     // console.log('path: ', path);
    //     this.traverse(path);
    // },
    // visitIdentifier: function (path) {
    //     this.traverse(path);
    // },
    // visitProperty: function (path) {
    //     // console.log('path: ', path.value.key.name, path.value.value.name);
    //     // if (path.value.comments) {
    //     //     console.log('comment: ', path.value.comments.map(function (c) {
    //     //         return c.value;
    //     //     }).join('\n'));
    //     // }
    //     // if (path.value.comments) {
    //     //     attributeComments.push({
    //     //         name: path.value.key.name,
    //     //         comments: path.value.comments.map(function (c) {
    //     //             return c.value;
    //     //         }).join('\n')
    //     //     });
    //     // }
    //     this.traverse(path);
    // }
// });