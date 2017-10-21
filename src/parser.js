/**
 *          XML to json parser
 */

const fs = require('fs');
let xml = fs.readFileSync("prjadm.xml", 'utf8');
let convert = require('xml-js');


/**
 * Reading xml file and converting it to json
 * @param path
 * @returns {string}    -   json obj
 */
module.exports.read = function read(path) {
    let xml = fs.readFileSync(path, 'utf8');
    var convertedObj = convert.xml2json(xml, {compact: false, spaces: 4});
    return convertedObj;
};


/**
 * Write json to xml file
 * @param obj
 * @param path
 */
module.exports.write = function write (obj,path) {
    var options = {ignoreComment: true, spaces: 4};
    var result = convert.json2xml(obj, options);
    fs.writeFile(
        path,
        result,function (err) {
            if (err) return console.log(err);
        }
    );
};


/**
 * Debug only
 * @param obj
 * @param path
 */
module.exports.testwrite = function (obj,path) {
    fs.writeFile(
        path,
        obj,function (err) {
            if (err) return console.log(err);
        }
    );
};