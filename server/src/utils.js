module.exports.buildTree = (data) => {
    var tree = [],
        mappedArr = {}

    // Build a hash table and map data to objects
    data.map((row) => {
        var id = row.id;
        if (!mappedArr.hasOwnProperty(id)) {
            mappedArr[id] = row.dataValues;
            mappedArr[id].subComments = [];
        }
    })

    // Loop over hash table
    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];

            if (mappedElem.parent_id) {
                var parentId = mappedElem.parent_id;
                mappedArr[parentId].subComments.push(mappedElem);
            }
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;
}

module.exports.bubbleSort = (a) => {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i].id < a[i + 1].id) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return a;
}