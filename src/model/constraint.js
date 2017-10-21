module.exports.Constraint = class Constraint{
    constructor(attr,id,uuid,table_id,unique_key_id){
        this.id = id;
        this.table_id = table_id;
        this.uuid = uuid;
        this.constraint_type = attr.constraint_type;
        this.reference = attr.reference;
        this.unique_key_id = unique_key_id;
        this.expression = attr.expression;
        let properties = attr.props;
        this["has_value_edit"] = properties.includes("has_value_edit");
        this["cascading_delete"] = properties.includes("cascading_delete");
    }
};

module.exports.ConstraintDetails =  class ConstraintDetails{
    constructor(position,id,constraint_id,field_id){

        this.position = position;
        this.id = id;
        this.constraint_id = constraint_id;
        this.field_id = field_id;

    }
};
