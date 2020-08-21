//index.js
//获取应用实例
var searchValue=''
var app = getApp()
Page({
  onReady:function(res){
    var that=this
    setInterval(function () {
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getHotVideo',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            hotList:res.data
        });
        }
    })
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getNewVideo',
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            newList:res.data
        });
        }
    })
  }, 1000)
  },
  data: {
    background: ['https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test1_kb.jpg', 'https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test2_kb.jpg',
    'https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test3_kb.jpg'],
    src:['https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test1_kb.jpg', 'https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test2_kb.jpg',
    'https://fengliu-123.oss-cn-shanghai.aliyuncs.com/test3_kb.jpg'],
    indicatorDots: true,
    indicatorColor:"grey",
    indicatorActiveColor:"white",
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
},
  toVideoPlay:function(e){
  var id=e.currentTarget.dataset.yes
  wx.navigateTo({
    url: "../video/video?videoId="+id,
  })
},
toHotList:function(){
wx.navigateTo({
  url: '../hotlist/hotlist',
})
},
getDataBindTap:function(e){
  searchValue= e.detail.value;
},
jump1:function(){
  wx.navigateTo({
    url: "../video/video?videoId=2",
  })
},
jump2:function(){
  wx.navigateTo({
    url: "../video/video?videoId=5",
  })
},
jump3:function(){
  wx.navigateTo({
    url: "../video/video?videoId=8",
  })
},
handleinput: function(){
  //处理输入搜索
  if(searchValue==''){
    wx.showToast({
      title: '请输入关键字',
      icon: 'none',
      duration: 1000
    })
  }else{
  console.log(searchValue)
  wx.navigateTo({
    url: "../search/search?value="+searchValue,
  })
}
}
 })