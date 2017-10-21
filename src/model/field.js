module.exports.Field = class Field{
    constructor(attr,id,table_id,domain_id,uuid){
        this.id = id;
        this.table_id = table_id;
        this.uuid = uuid;
        this.domain_id = domain_id;


        this.name = attr.name;
        this.position = attr.position;
        this.russian_short_name = attr.rname;
        this.description = attr.description;

        let properties = attr.props;

        this["can_input"] = properties.includes("input") ? true: undefined;
        this["can_edit"] = properties.includes("edit") ? true: undefined;
        this["show_in_grid"] = properties.includes("show_in_grid") ? true: undefined;
        this["show_in_details"] = properties.includes("show_in_details") ? true: undefined;
        this["autocalculated"] = properties.includes("is_mean") ? true: undefined;
        this["required"] = properties.includes("required") ? true: undefined;

    }
};
