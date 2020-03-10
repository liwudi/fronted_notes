/**
 * Created by mapbar_front on 2020-03-01.
 */
process.stdin.on('readable', function() {
    let chunk;
    while ((chunk=process.stdin.read()) !== null) {
        let a = chunk.toString();
        let lines = a.split(' ');
        var n = parseInt(lines[0]);
        var k = parseInt(lines[1]);
        getStr(n, k);
    }
})
function getStr(n, k) {
    let arr = getAllString(n);
    console.log(arr[k]);
    return arr[k];
}

function getAllString(n){
    let initArr = [];
    for(let i = 1; i < n + 1;i++) {
        initArr.push(i);
    }
    let returnArr = [];
    // 进行遍历交换
    let len = initArr.length
    for (let i = 0; i < len;i++) {
        for (let j = 0; j < len;j++) {
            let arr = JSON.parse(JSON.stringify(initArr));
            if (i !== j) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                returnArr.push(arr.join(''));
            }
        }
    }
    return returnArr.sort();
}
