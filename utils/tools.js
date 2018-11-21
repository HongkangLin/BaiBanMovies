/**封装swan.request,实现链式调用
 * @param options请求参数(为对象)
 */
function myPro(options){
    return new Promise(function(resolve,reject){
        swan.request({
            url: options.url || '',
            method: options.method ||'GET',
            dataType:options.dataType || 'json',
            data: options.data || {},
            header: options.header ||{
                'content-type': 'application/json' 
            },
            success: function (res) {
                //console.log(res.data);
                resolve(res);
            },
            fail: function (err) {
                // console.log('错误码：' + err.errCode);
                // console.log('错误信息：' + err.errMsg);
                reject('错误码：' + err.errCode);
            }
        });
    })
}

/**
 * 星星算法
 * @param average平均分
 */
function makeStar(average) {
    
    let starNum = average / 2;
    let intNum = Math.floor(starNum);
    let floatNum = starNum - intNum;

    // 根据startNum计算出星星数组
    let starArr = [];
    for (let i = 0; i < 5; i++) {
       
        if (i < intNum) {
            starArr[i] = 1;
        } else if (i == intNum) {
           
            if (floatNum == 0) {
                starArr[i] = 2;
            } else if (floatNum < .5) {
                
                starArr[i] = 3
            } else {
                starArr[i] = 1;
            }
            
        } else {
            
            starArr[i] = 2;
        }
    }
    // 返回星星数组
    return starArr;
}

module.exports={
    baseUrl: 'https://douban.uieee.com/v2/',
    myPro,
    makeStar
}