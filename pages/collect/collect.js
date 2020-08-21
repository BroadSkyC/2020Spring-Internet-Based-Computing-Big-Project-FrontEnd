// pages/collect/collect.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    console.log(parseInt(options.id))
    setInterval(function () {
      wx.request({
      url: app.globalData.baseUrl+'/api/user/getCollects',
      method:'GET',
      data:{
        id:app.globalData.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success (res) {
          that.setData({
            collectList:res.data
          }
          )
        }
    })
  },100)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  toVideoPlay:function(e){
    var id=e.currentTarget.dataset.yes
    wx.navigateTo({
      url: '../video/video?videoId='+id,
    })
  }
})