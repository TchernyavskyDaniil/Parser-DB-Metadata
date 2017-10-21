module.exports.Table = class Table {
    constructor(attr, id, schema_id, uuid) {
        this.id = id;
        this.schema_id = schema_id;
        this.uuid = uuid;

        this.name = attr.name;
        this.description = attr.description;
        this.can_add = undefined;
        this.cen_edit = undefined;
        this.can_delete = undefined;
        this.temporal_mode = undefined;
        this.means = undefined;

        let properties = attr.props;
        this["can_add"] = properties.includes("add") ? true: undefined;
        this["cen_edit"] = properties.includes("edit")? true: undefined;
        this["can_delete"] = properties.includes("adeletedd")? true: undefined;

    }
};
