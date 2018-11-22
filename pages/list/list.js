let tools = require("../../utils/tools");

Page({
    data: {
        tag: '',
        startIndex: 0,
        count: 9,
        movieList: [],
        total: 0,
        listName: ''
    },

    onLoad(event) {
        
        this.setData({
            tag: event.tag
        })
        
        // 根据参数tag设置不同的 头部
        switch (this.data.tag) {
            case 'in_theaters':
              this.setData({
                listName: '影院热映'
              })
              break;
            case 'top250':
              this.setData({
                listName: 'TOP250'
              })
              break;
            case 'coming_soon':
              this.setData({
                listName: '即将上映'
              })
              break;
        }

        tools.myPro({
            url: tools.baseUrl + "movie/" + this.data.tag,
            data: {    
                start: this.data.startIndex,
                count: this.data.count
            },
            header:{
                "Content-Type":"json"
            },
        }).then(result => {
            
            // 修改星星的数据
            result.data.subjects.forEach(v => {
                v.starArr = tools.makeStar(v.rating.average);
            })
            
            this.setData({    
                movieList: result.data.subjects,
                total: result.data.total
            })
                    
        })
        
        
    },

    onReachBottom(){
        swan.stopPullDownRefresh();
        
        if(this.data.startIndex>this.data.total){
            
            swan.showToast({
              title: '后面木有啦!',
              icon: 'none',
              image: '',
              duration: 2000,
              mask: false,
              success: (result)=>{
                
              },
              fail: ()=>{},
              complete: ()=>{}
            });
            return;
        }
        
        swan.showLoading({
            title:'玩命加载中' ,
        });
      
        let oldIndex = this.data.startIndex;
        let newIndex = oldIndex + this.data.count;

        this.setData({
          startIndex: newIndex
        });

        tools.myPro({
            url: tools.baseUrl + "movie/" + this.data.tag,
            data: {    
                start: this.data.startIndex,
                count: this.data.count
            },
            header:{
                "Content-Type":"json"
            },
        }).then(result => {
            
            // 修改星星的数据
            result.data.subjects.forEach(v => {
                v.starArr = tools.makeStar(v.rating.average);
            })
            
            let oldArr = this.data.movieList;
            oldArr = oldArr.concat(result.data.subjects);

            this.setData({    
                movieList: oldArr,
                total: result.data.total
            });

            swan.hideLoading();
                    
        })

        
    },

    onPullDownRefresh: function () {
        
        this.setData({
          startIndex: 0,
          movieList: []
        });
    
        tools.myPro({
            url: tools.baseUrl + "movie/" + this.data.tag,
            data: {    
                start: this.data.startIndex,
                count: this.data.count
            },
            header:{
                "Content-Type":"json"
            },
        }).then(result => {
            
            // 修改星星的数据
            result.data.subjects.forEach(v => {
                v.starArr = tools.makeStar(v.rating.average);
            })
            
            this.setData({    
                movieList: result.data.subjects,
                total: result.data.total
            })
            
            swan.stopPullDownRefresh();
        })
        
        
    }
    
})
