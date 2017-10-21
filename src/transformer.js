/**
 * Getting all child elements by name
 * @param element - parent
 * @param result
 * @param names
 * @returns {*}
 */
module.exports.walkAll = function walkAll(element,result,names) {
    if (!element) return;

    if (element.elements){

        element.elements.forEach(function (el) {
            if (el.name && names.includes(el.name)){
                result.push(el);
            }else{
                return walkAll(el,result,names);
            }
        });
    }

    return result;
};

