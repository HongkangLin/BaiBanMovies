let tools = require("../../utils/tools");

Page({
    data: {
        id: '',
        movieInfo: {},
        // 简短的影评
        cutSummary: ''
    },

    onLoad(event) {
        this.setData({
            id: event.id
        });

        tools.myPro({
            url: tools.baseUrl + `movie/subject/${this.data.id}`,
            header:{
                "Content-Type":"json"
            },
        }).then(result => {
            
            result.data.starArr = tools.makeStar(result.data.rating.average);
           
            this.setData({
              movieInfo: result.data,
              // 简短的影评 
              cutSummary: result.data.summary.substr(0, 65) + '...'
            });
            
        })
        
    },
    
    // 显示更多
    more() {
        this.setData({
        cutSummary: this.data.movieInfo.summary
        })
    },

    // 缩短内容
    cut() {
        this.setData({
        cutSummary: this.data.movieInfo.summary.substr(0, 65) + '...'
        })
    },

    
})
