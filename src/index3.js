var parseString = require('xml2js').parseString
var fs = require('fs')



var xml = fs.readFileSync('./prjadm.xml', 'utf8')

var allDomains = {}
var allTables = {}

parseString(xml, (err, res) => {
    // Fill allDomains
    res.dbd_schema.domains[0].domain
        .forEach((domain) => {
            let name = domain['$'].name;
            allDomains[name] = {
                type: domain['$'].type,
                length: domain['$'].width,
                align: domain['$'].align,
                description: domain['$'].description
            };

            if (domain['$'].type.toLowerCase()==="string") {
                try {

                    allDomains[name]["char_length"] = domain['$'].char_length;
                    allDomains[name]["case_sensitive"] =
                        domain['$'].props.includes("case_sensitive") ? true : undefined;

                } catch (e) {

                }
            }
        });


    // console.log(allDomains);

    // Parse tables
    res.dbd_schema.tables[0].table
        .forEach((table, i) => {
        // console.log(table);
        let name = table['$'].name;
        // console.log(name);
        allTables[name] = {
            fields: [],
            description:table['$'].description
        };
        try{
            allTables[name]['can_add'] =
                table['$'].props.includes("add") ? true : undefined;

            allTables[name]['can_edit'] =
                table['$'].props.includes("edit") ? true : undefined;

            allTables[name]['can_delete'] =
                table['$'].props.includes("delete") ? true : undefined;

        }catch (e){

        }
        let fields = table['field'];
        allTables['fields'] = [];
        // console.log(fields);
        fields.forEach((field,i) =>{
            let field_obj = {
                name: field['$'].name,
                russian_short_name: field['$'].rname,
                description: field['$'].description,
                domain: allDomains[field['$'].domain],
            };
            try{
                field_obj['can_edit'] = field['$'].props.includes("edit") ? true : undefined;
                field_obj['can_input'] = field['$'].props.includes("input") ? true : undefined;
                field_obj['show_in_grid'] = field['$'].props.includes("show_in_grid") ? true : undefined;
                field_obj['show_in_details'] = field['$'].props.includes("show_in_details") ? true : undefined;
                field_obj['is_mean'] = field['$'].props.includes("is_mean") ? true : undefined;
                field_obj['autocalculated'] = field['$'].props.includes("autocalculated") ? true : undefined;
                field_obj['required'] = field['$'].props.includes("required") ? true : undefined;

            }catch (e){

            }

           allTables['fields'][field_obj.name] = field_obj;


        });
        if (i > 0) return;

            // console.log(
            //     generateCreateTableStructure(table, allDomains)
            // )
        });



});
console.log(allTables);