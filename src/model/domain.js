module.exports.Schema = class Domain{
    constructor(json,id,uuid,data_type_id){
        this.id = id;
        this.uuid = uuid;
        let attr = json.attributes;
        this.description = json.description;
        this.scale = attr.scale;
        this.name = attr.name;
        this.align = attr.align;
        this.width = attr.width;
        this.char_length = attr.char_length;
        this.data_type_id = data_type_id;
        this.length = attr.length;
        this.precision = attr.length;

        let properties = attr.props;
        this["show_null"] = properties.includes("show_null") ? true: undefined;
        this["case_sensitive"] = properties.includes("case_sensitive") ? true: undefined;
        this["show_lead_nulls"] = properties.includes("show_lead_nulls") ? true: undefined;
        this["show_in_details"] = properties.includes("show_in_details") ? true: undefined;
        this["thousands_separator"] = properties.includes("thousands_separator") ? true: undefined;

    }

};
