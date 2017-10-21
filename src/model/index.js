module.exports.Index = class Index{
    constructor(local,id,table_id,uuid){
        this.id = id;
        this.uuid = uuid;
        this.table_id = table_id;
        this.name = json.attributes.name;
        this.kind = json.attributes.kind;
        this.local = local;
    }
};
module.exports.IndexDetails = class IndexDetails{
    constructor(obj){
        this.id = obj.id;
        this.index_id = obj.index_id;
        this.position = obj.position;
        this.field_id = obj.field_id;
        this.expression = obj.expression;
        this.descend = obj.descend;
    }
};