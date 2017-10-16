// Replicate filter functionality for object maps 
exports = module.exports = function mapFilter(map, filter){
    let filtered = []
    for (var key in map) {
        // skip loop if the property is from prototype
        if(!map.hasOwnProperty(key)) {
            continue;
        }
        // filter the maps property
        if(filter(map[key])) {
            filtered.push(map[key]);
        }
    }
    return filtered;
}