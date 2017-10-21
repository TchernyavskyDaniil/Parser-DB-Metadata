var parser = require("./parser.js");
var transformer = require("./transformer.js");
var sqlexecutor = require("./sqlexecutor.js");
// var Domain = require("./model/domain.js");
// var Table = require("./model/table.js");
// var Field = require("./model/field.js");
// var Constraint = require("./model/constraint.js");
// var Index = require("./model/index.js");


var Table = class Table{

    constructor(json_obj){
        let attr = json_obj.attributes;
        this.name = attr.name || null;
        this.description = json_obj.description || null;
        this.props = json_obj.props || null;
        this.rname = json_obj.rname || null;
        this.access_level = json_obj.access_level || null;
        this.ht_table_flags = json_obj.ht_table_flags || null;

        this.fields = null;
    }
}
var Index = class Index {

    constructor(element) {
        this.props = element.props || null;
        this.fieldName = element.field || null;

        this.field = null;
    }
}
var Domain = class Domain{


    constructor(json_element){
        let attr = json_element.attributes;

        this.name = attr.name || null;
        this.type = attr.type || null;
        this.align = attr.align || null;
        this.width = attr.width || null;
        this.props = attr.props || null;
        this.char_length = attr.char_length || null;
        this.description = attr.description || null;
    }
}
var Field = class Field {

    constructor(element){

        let attr = element.attributes || null;
        this.domainName = attr.domain || null;
        this.name = attr.name || null;
        this.rname = attr.rname || null;
        this.props = attr.props || null;
        this.description = attr.description || null;

        this.domain = null;
        this.constraints = [];
        this.index = null;

    }

    addConstraint(value){
        this.constraints.push(value);
    }


}
var Constraint = class Constraint {

    constructor(element){
        this.kind = element.kind || null;
        this.items = element.items || null;
        this.reference = element.reference || null;
        this.props = element.props || null;

        this.field = null;
    }

};

var prjadm = parser.read('prjadm.xml');

var json = JSON.parse(prjadm);


let dbElements = transformer.walkAll(json,[],"domains,tables");
let domains = dbElements[0].elements;

/**
 * TODO Creating sql queries here
 */

let tablesObj = [];


let tables = dbElements[1].elements;

tables.forEach(function (table) {
   let tableObj = new Table(table);
   let elements = transformer.walkAll(table,[],"field,constraint,index");
   let fields = new Map();      //key - name;   val - Field
   let constraints = new Map(); //key - items;  val - Constraint
   let indexes = new Map();     //key - field;  val - Index

   let fieldsObj = {};

   Array.from(elements).forEach(function (item) {
      // console.log(item);
      switch (item.name){
          case 'field':
              fields.set(item.attributes.name,new Field(item));
              break;
          case 'index':
              indexes.set(item.attributes.field,new Index(item));
              break;
          case 'constraint':
              constraints.set(item.attributes.items,new Constraint(item));;
              break;
      }
   });
   // console.log(indexes);


   fields.forEach(function (val, key, fields) {
       console.log(key);
      console.log(indexes[key]);
      console.log(constraints[key]);

   });

   // console.log('fields');
   // console.log(fields);
   // console.log('indexes');
   // console.log(indexes);
   // console.log('constraints');
   // console.log(constraints);


    // Array.from(fields).forEach(function (obj) {
   //     let field = new Field(obj);
   //     console.log(obj);
   //     fieldsObj[obj.name] = field;
   //     console.log(fieldsObj);
   // });
   //
   //  Array.from(constraints).forEach(function (obj) {
   //    let constraint = new Constraint(obj);
   //    if (Object.keys(fieldsObj).includes(constraint.items)){
   //        fieldsObj[constraint.items].addConstraint(constraint);
   //        constraint.field = fieldsObj[constraint.items]
   //    }
   // });
   //
   //  Array.from(indexes).forEach(function (obj) {
   //    let index = new Index(obj);
   //     if (Object.keys(fieldsObj).includes(index.fieldName)){
   //         fieldsObj[index.fieldName] = index;
   //         index.field = fieldsObj[index.fieldName]; //not necessary
   //     }
   // });
   // console.log(fieldsObj);
   // tableObj.fields = fieldsObj;

    /**
     * TODO Creating sql queries here
     */

});

// sqlexecutor.connect("PRJADM");
// sqlexecutor.execute(/**sql*/);
// sqlexecutor.disconnect();


//parser.testwrite(prjadm,'prjadm.json');


//parser.write(prjadm,"prjadm_test.xml");

