// pages/cancelOrder/cancelOrder.js
var orderId;
var orderPrice;
var serviceCharge;
var refund;
var rate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId,
    orderPrice,
    serviceCharge,
    refund,
    rate,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderId = options.orderId;
    orderPrice = options.orderPrice;
    serviceCharge = options.serviceCharge;
    refund = options.refund;
    rate = (serviceCharge/orderPrice)*100;
    this.setData({
      orderId: orderId,
      orderPrice: orderPrice,
      serviceCharge: serviceCharge,
      refund: refund,
      rate: rate,
    });
  },

  cancel: function(e){
    
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