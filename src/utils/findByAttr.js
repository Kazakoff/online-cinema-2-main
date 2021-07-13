export const findByAttr = function (arr, attr, value) {
    let i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            return arr[i];
        }
    }
}