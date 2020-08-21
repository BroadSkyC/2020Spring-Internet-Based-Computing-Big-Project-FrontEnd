const app = getApp()
Page({
  onReady: function (res){
  },
  data: {
    userId:app.globalData.userId,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    massage:'initial',
    orderItems: [
      {
        typeId: 0,
        name: '粉丝',
        url: 'bill',
        imageurl: '../../imageIcon/fensi.png',
      },
      {
        typeId: 1,
        name: '关注',
        url: 'bill',
        imageurl: '../../imageIcon/guanzhu.png',
      },
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  inputHandler:function(e){
    this.setData({
      message:e.detail.value
    })
    //用来改变data数据
  },
  buttonTapHandler:function(e){
console.log(123)
//获取参数属性
console.dir(e.target.dataset)
  },
  innerHandler:function(){
console.log("inner")
  },
  outterHandler:function(){
    console.log("outter")
      },
  onLoad: function () {
    var that=this
    setInterval(function(){
    wx.request({
      url: app.globalData.baseUrl+'/api/user/getUserInfo',
      method:'GET',
      data:{
        id:app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        }, 
        success (res) {
            that.setData({
              user:res.data
            })
          }
      })},100)
  },
  getUserInfo: function(e) {
    var that=this
    console.log(e)
    app.globalData.isLogIn=true
    app.globalData.userName=e.detail.userInfo.nickName
    app.globalData.userImg=e.detail.userInfo.avatarUrl
    wx.request({
      url: app.globalData.baseUrl+'/api/user/getUserId',
      method:'GET',
      data:{
        name:app.globalData.userName,
        img:app.globalData.userImg
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        success (res) {
            if(res.data!=0){
              app.globalData.userId=res.data
            }else{
              wx.request({
                url: app.globalData.baseUrl+'/api/user/getUserId',
                method:'GET',
                data:{
                  name:app.globalData.userName,
                  img:app.globalData.userImg
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
                  }, 
                  success (res) {
                      app.globalData.userId=res.data
                    }
                })
            }
          }
        })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  upload_handler:function(){
    var that=this
    if(app.globalData.isLogIn){
    console.log("publish")
    wx.navigateTo({
     url: '../publish/publish'
   })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   handleJump:function(e){
     var type=e.currentTarget.dataset.yes
     if(type==0){
       this.showFensi()
     }else{
       this.showGuanZhu()
     }
   },
   showFensi:function(){
     if(app.globalData.isLogIn){
    wx.navigateTo({
      url: "../fans/fans",
    })
  }else{
    wx.showToast({
      title: '请先登录！',
      icon:'none',
      time:500
    })
  }
   },
   showGuanZhu:function(){
     if(app.globalData.isLogIn){
    wx.navigateTo({
      url: "../guanzhu/guanzhu",
    })
  }else{
    wx.showToast({
      title: '请先登录！',
      icon:'none',
      time:500
    })
  }
   },
  collect_handler:function(){
    var that=this
    if(app.globalData.isLogIn){
    console.log("collect")
    wx.navigateTo({
     url: "../collect/collect"
   })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   release_handler:function(){
    var that=this
     if(app.globalData.isLogIn){
    console.log("release")
    wx.navigateTo({
     url: '../release/release'
   })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   history_handler:function(){
    var that=this
     if(app.globalData.isLogIn){
    console.log("history")
    wx.navigateTo({
     url: '../history/history'
   })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   comment_handler:function(){
    var that=this
     if(app.globalData.isLogIn){
    wx.navigateTo({
      url: '../comment/comment'
    })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   others_handler:function(){
    var that=this
     if(app.globalData.isLogIn){
    wx.navigateTo({
      url: '../dianzan/dianzan'
    })
  }else{
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  }
   },
   containerTap: function (res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function () {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.2s linear;animation:ripple 0.2s linear;'
      });
    }, 200)
  }
})