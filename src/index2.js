var parser = require("./parser.js");
var transformer = require("./transformer.js");
var sqlexecutor = require("./sqlexecutor.js");
var Schema = require("./model/schema.js").Schema;
var Table = require("./model/table.js").Table;
var Field = require("./model/field.js").Field;
var Domain = require("./model/domain.js").Schema;
var Index = require("./model/index.js").Index;
var IndexDetails = require("./model/index.js").IndexDetails;
var Constraint = require("./model/constraint.js").Constraint;
var ConstraintDetails = require("./model/constraint.js").ConstraintDetails;


var prjadm = parser.read('prjadm.xml');



var json = JSON.parse(prjadm);
let schema = new Schema(1,json.elements[0].attributes.name);
console.log(schema);

let dbElements = transformer.walkAll(json,[],"domains,tables");
let domains = dbElements[0].elements;
let tables = dbElements[1].elements;


/**TODO запрос получающий id типа*/



    /**
     * TODO сделать что-то с ht_table_flags и access_level
     * их уберем из xml
     */





console.log(new Table(tables[6].attributes));
