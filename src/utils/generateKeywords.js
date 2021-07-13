export function generateKeywords(str, arr) {
    let i
    if (str.length < 1)
        return;
    for (i = 0; i < str.length; ++i) {
        arr.push(str.substr(0, i + 1));
    }
    generateKeywords(str.substr(1, i + 1), arr);
}