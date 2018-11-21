let tools = require("../../utils/tools");

Page({
    data: {
        hotMovieList:[],
        top250:[],
        commingSoon:[]
    },

    onLoad(event) {
        
        let p1 = tools.myPro({
            url: tools.baseUrl + "movie/in_theaters",
            header:{
                "Content-Type":"json"
            },
        });

        let p2 = tools.myPro({
            url: tools.baseUrl + "movie/top250",
            header:{
                "Content-Type":"json"
            },
        });

        let p3 = tools.myPro({
            url: tools.baseUrl + "movie/coming_soon",
            header:{
                "Content-Type":"json"
            },
        });

        Promise.all([p1, p2, p3]).then(result => {
            // 修改星星的数据
            for (let index = 0; index <= 2; index++) {
                result[index].data.subjects.forEach(v => {
                    v.starArr = tools.makeStar(v.rating.average);
                })
                
            }
            
            this.setData({
                hotMovieList : result[0].data.subjects,
                top250 : result[1].data.subjects,
                commingSoon : result[2].data.subjects
            })
                    
        })
    }


    
})
