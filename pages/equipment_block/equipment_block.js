// pages/equipment_block/equipment_block.js
var app = getApp()
Page( {
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
   
  },
  onLoad: function() {
    var that = this;
 
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
 
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
 
    });
    setInterval(function () {
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getHotVideoByBlcok',
      data:{
        block:"装备",
        sub:"开箱测评"
      },
      method:'GET',
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success (res) {
        that.setData({
          hotList_kaixiang:res.data
       });
        }
    })
    wx.request({
      url: app.globalData.baseUrl+'/api/video/getNewVideoByBlcok',
      data:{
        block:"装备",
        sub:"开箱测评"
      },
      method:'GET',
      header:{
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success (res) {
        that.setData({
          newList_kaixiang:res.data
       });
        }
    })

   wx.request({
     url: app.globalData.baseUrl+'/api/video/getHotVideoByBlcok',
     data:{
       block:"装备",
       sub:"性能测评"
     },
     method:'GET',
     header:{
       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
     },
     success (res) {
       that.setData({
         hotList_ceping:res.data
      });
       }
   })
   wx.request({
     url: app.globalData.baseUrl+'/api/video/getNewVideoByBlcok',
     data:{
       block:"装备",
       sub:"性能测评"
     },
     method:'GET',
     header:{
       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
     },
     success (res) {
       that.setData({
         newList_ceping:res.data
      });
       }
   })
  },100)
  },
  /**
     * 滑动切换tab
     */
  bindChange: function( e ) {
 
    var that = this;
    that.setData( { currentTab: e.detail.current });
 
  },
  /**
   * 点击tab切换
   */
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
    }
})