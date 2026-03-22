const createTree = (arr, parentId="") => {
    let count = 0;
    const Tree = (arr, parentId = "") => {
        const tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                count++;
                const newItem = item;
                newItem.index = count;
                const children = Tree(arr, item.id);
                if(children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    };
    return Tree(arr, parentId);
}

module.exports = createTree;