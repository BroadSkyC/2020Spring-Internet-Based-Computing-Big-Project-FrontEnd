// pages/video/video.js
var app = getApp()
var isGuanZhu=false
var author=0
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onLoad:function(options){
    this.setData({
      postId:options.videoId
    })
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    var that=this
    var postId=that.data.postId
     
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getVideoPostedTime',
      method:'GET',
      data:{
        id:postId
      },
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            videoExistedTime:res.data
        });
        }
    })
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getVideoById',
      method:'GET',
      data:{
        id:postId
      },
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            result:res.data
        });
        }
    })
    setInterval(function(){
    wx.request({
      url: app.globalData.baseUrl+'/api/danmu/getDanmuList',
      method:'GET',
      data:{
        postid:postId
      },
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            danmuList:res.data
        });
        }
    })},100)
    var that=this
    wx.request({
      url:app.globalData.baseUrl+'/api/video/getVideoAuthor',
      method:'GET',
      data:{
        postId:postId
      },
      header: {
        'content-type': 'application/json' // 默认值
        },
        success (res) {
          //若已登录则判断是否已关注该UP
          if(app.globalData.isLogIn){
          author=res.data
          if(app.globalData.userid==res.data){
            that.setData({
              isGuanZhu:true
            })
          }else{
          wx.request({
            url:app.globalData.baseUrl+'/api/user/isGuanZhu',
            method:"GET",
            data:{
              id:app.globalData.userId,
              upId:author
            },
            header:{
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            success(res){
              console.log("判断是否已经关注，结果为 "+res.data)
              if(res.data){
                that.setData({
                  isGuanZhu:true
                })
              }
            }
          })
        }
      }
      //获取作者信息
          wx.request({
            url: app.globalData.baseUrl+'/api/user/getUserInfo',
            method:'GET',
            data:{
              id:res.data,
            },
            header: {
              'content-type': 'application/json' // 默认值
              },
              success (res) {
                that.setData({
                  userInfo:res.data
              });
              }
          })
        }
    })
    wx.getSystemInfo( {

      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  data:{
    postId:0,
    playCount:0,
    likeCount:0,
    likeDanmu:0,
    commentTime:0,
    currentVideoTime:0,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  inputValue: '',
  guanzhu:function(e){
    if(!app.globalData.isLogIn){
      wx.showToast({
        title: '登录后才能关注！',
        icon:'none',
        time:500
      })
    }else{
    var that=this
    console.log(author)
    wx.request({
      url:app.globalData.baseUrl+'/api/user/addGuanzhu',
      method:'POST',
      data:{
        id:app.globalData.userId,
        upId:author
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
      },
      success(res){
        if(res.data){
          wx.showToast({
            title:"关注成功",
            icon:"success",
            time:500
          })
          that.setData({
            isGuanZhu:true
          })
        }
      }
    })
  }
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
    bindButtonTap: function() {  //视频下载
        var that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: ['front','back'],
            success: function(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },
    start:function(){
      var that=this
      var postId=that.data.postId
      that.setData({
        playCount:that.data.playCount+1
      })
    wx.request({
      url: app.globalData.baseUrl+'/api/video/addPlayNum',
      method:'POST',
      data:{
        id:postId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success (res) {
        }
    })
    if(app.globalData.isLogIn){
    wx.request({
      url: app.globalData.baseUrl+'/api/user/addHistory',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        id:app.globalData.userId,
        postId:postId
      }
    })
  }
    },
    addCollect:function(){
      if(!app.globalData.isLogIn){
        wx.showToast({
          title: '登录后才能收藏！',
          icon: 'none',
          duration: 1000
        })
      }else{
      var that=this
      var postId=that.data.postId
      wx.request({
        url: app.globalData.baseUrl+'/api/user/isCollected',
        method:"GET",
        header:{
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
        },
        data:{
          id:app.globalData.userId,
          postId:postId
        },
        success(res){
          console.log("判断是否已经在收藏夹中，结果："+res.data)
          if(res.data){
            wx.showToast({
              title: '已经收藏过了哦~',
              icon: 'none',
              duration: 1000
            })
          }else{
          wx.showToast({
            title: '收藏+1',
            icon: 'none',
            duration: 1000
          })
          wx.request({
            url: app.globalData.baseUrl+'/api/user/addCollect',
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data:{
              id:app.globalData.userId,
              postId:postId
            }
          })
        }
        }
      })
    }
    },
    bindChange: function( e ) {

      var that = this;
      that.setData( { currentTab: e.detail.current });

    },
    swichNav: function( e ) {

      var that = this;

      if( this.data.currentTab === e.target.dataset.current ) {
        return false;
      } else {
        that.setData( {
          currentTab: e.target.dataset.current
        })
      }
    },
    bindSendDanmu: function () {
      if(!app.globalData.isLogIn){
        wx.showToast({
          title: '登录后才能发送弹幕！',
          icon: 'none',
          duration: 1000
        })
      }else{
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor()
      })
      var that=this
      that.setData({
        commentTime:that.data.commentTime+1
      })
      var postId=that.data.postId
      wx.request({
        url: app.globalData.baseUrl+'/api/video/addCommentNum',
        method:'POST',
        data:{
          id:postId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
          },
      }),
      wx.request({
        url: app.globalData.baseUrl+'/api/danmu/addDanmu',
        method:'POST',
        data:{
          postid:postId,
          userid:app.globalData.userId,
          userImg:app.globalData.userImg,
          userName:app.globalData.userName,
          text:this.inputValue,
          color:getRandomColor(),
          time:that.data.currentVideoTime+1,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
          },
          success (res) {
            wx.showToast({
              title:"发送成功！",
              time:300,
              icon:'success',
            })
          }
      })
    }
    },
  timeUpdate: function (e) {
    //实时播放进度 秒数
      var currentTime = parseInt(e.detail.currentTime)
      this.setData({
        currentVideoTime:currentTime
      })
  },
  addLikes:function(){
    if(!app.globalData.isLogIn){
      wx.showToast({
        title: '登录后才能点赞！',
        icon: 'none',
        duration: 1000
      })
    }else{
    var that=this
    var postId=that.data.postId
    that.setData({
      likeCount:that.data.likeCount+1
    })
    wx.request({
      url: app.globalData.baseUrl+'/api/user/isLiked',
      method:"GET",
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
      },
      data:{
        id:app.globalData.userId,
        postId:postId
      },
      success(res){
        console.log("判断是否已经点过赞了，结果："+res.data)
        if(res.data){
          wx.showToast({
            title: '已经点过赞了哦~',
            icon: 'none',
            duration: 1000
          })
        }else{
        wx.showToast({
          title: '点赞+1',
          icon: 'none',
          duration: 1000
        })
        wx.request({
          url: app.globalData.baseUrl+'/api/user/addLike',
          method:'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data:{
            id:app.globalData.userId,
            postId:postId
          }
        })
      }
      }
    })
  }
  },
  goodDanmu:function(e){
    var that=this
    var danmuId=e.currentTarget.dataset.yes
    if(app.globalData.isLogIn){
    wx.request({
      url: app.globalData.baseUrl+'/api/user/isGoodDanmu',
      method:'GET',
      data:{
        danmuId:danmuId,
        id:app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success (res) {
          if(res.data){
            wx.showToast({
              title: '已经赞过这条弹幕了哦~',
              icon: 'none',
              duration: 500
            })
          }else{
            that.setData({
              likeDanmu:that.data.likeDanmu+1
            })
            wx.showToast({
              title: '你赞了这条弹幕~',
              icon: 'none',
              duration: 500
            })
            wx.request({
              url: app.globalData.baseUrl+'/api/user/addDanmuLike',
              method:'POST',
              data:{
                danmuId:danmuId,
                id:app.globalData.userId
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                success (res) {
                }
            })
          }
        }
    })
  }else{
    wx.showToast({
      title: '登录后才能点赞哦~',
      icon:'none',
      time:500
    })
  }
  },
    videoErrorCallback: function(e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
    }
})