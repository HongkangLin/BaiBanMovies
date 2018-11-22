let tools = require("../../utils/tools");
let myDataList = require("../../utils/list");

Page({
    data: {
        // 自做的接口数据
        myDataList,
        movieList:[]
    },

    search(event) {
        console.log(event);
        // 搜索的内容
        let searchName = event.detail.value;

        tools.myPro({
            url: tools.baseUrl + `movie/search?q=${searchName}`,
            header:{
                "Content-Type":"json"
            },
        }).then(result => {
          
            result.data.subjects.forEach(v=>{
                v.starArr = tools.makeStar(v.rating.average);
            })

            this.setData({
                movieList:result.data.subjects
            })
        })
    }


    
})
