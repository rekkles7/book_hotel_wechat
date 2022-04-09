// pages/payOrder/payOrder.js
var orderPrice;
var roomName;
var startOfDate;
var orderId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderPrice,
    roomName,
    startOfDate,
    orderId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderPrice = options.orderPrice;
    roomName = options.roomName;
    startOfDate = options.startOfDate;
    orderId = options.orderId;
    console.log(orderId)
    this.setData({
      orderPrice: orderPrice,
      roomName: roomName,
      startOfDate: startOfDate,
      orderId: orderId
    })
  },
  toPayOrder:function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/user/order/toPayOrder',
      data:{
        orderId: orderId
      },
      success(res){
        wx.showToast({
          title: "付款成功", // 提示的内容
          icon: "success", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          mask: false, // 是否显示透明蒙层，防止触摸穿透
          success: function(){
            setTimeout(function() {
              //要延时执行的代码
              wx.switchTab({
                url: '../minePage/minePage',
              })
            }, 2000) //延迟时间
          }
      })
      }
    })
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