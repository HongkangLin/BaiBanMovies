/**封装swan.request,实现链式调用
 * 
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

module.exports={
    baseUrl: 'https://douban.uieee.com/v2',
    myPro
}