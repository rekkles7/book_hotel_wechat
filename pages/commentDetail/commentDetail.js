// pages/commentDetail/commentDetail.js
var hotelId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hotelId = options.hotelId;
    console.log("****"+hotelId)
    wx.request({
      url: 'http://127.0.0.1:8000/user/comments/selectCommentsByHotelId',
      data: {
        hotelId: hotelId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res=> {
        console.log(res.data.data)
        this.setData({
             commentsArray: res.data.data
        })
      }
    })
    // 以下两个是测试数据
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

  }
})