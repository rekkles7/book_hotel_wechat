// pages/orderDetail/orderDetail.js
var orderStatus;
var orderId;
var hotelName;
var roomNumber;
var roomName;
var roomService;
var startOfDate;
var endOfDate;
var orderPrice;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '13:00',
    orderStatus: '',
    orderId: '',
    hotelName: '',
    roomNumber: '',
    roomName: '',
    roomService: '',
    startOfDate: '',
    endOfDate: '',
    orderPrice: '',
    orderUserName: '',
    orderUserTelephone: '',
    orderCreateTime: '',
    orderPayTime: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderStatus = options.orderStatus;
    orderId = options.orderId;
    hotelName = options.hotelName;
    roomNumber = options.roomNumber;
    roomName = options.roomName;
    roomService = options.roomService;
    startOfDate = options.startOfDate;
    endOfDate = options.endOfDate;
    orderPrice = options.orderPrice;
    console.log(startOfDate)
    this.setData({
      orderStatus: orderStatus,
      orderId: orderId,
      hotelName: hotelName,
      roomNumber: roomNumber,
      roomName: roomName,
      roomService: roomService,
      startOfDate: startOfDate,
      endOfDate: endOfDate,
      orderPrice: orderPrice
    });
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