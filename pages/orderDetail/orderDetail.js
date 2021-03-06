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
var mins;
var seconds;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    expiretime:'',
    mins:'',
    seconds:'',
    timer: ''
  },
  cancelRules: function () {
    this.showModal();
  },

  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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
    this.selectOrderById(orderId);
    this.isToPay(orderStatus,orderId);
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
  isToPay: function(orderStatus,orderId){
    var that = this;
    if(orderStatus == 0){
      console.log("yesyesyes")
      that.getExpireTime(orderId);
    }
  },
  countDown: function () {
    var that = this;
    let expiretime = that.data.expiretime;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.data.timer = setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (expiretime == 0) {
          wx.showToast({
            title: 'aaa',
          })
          clearInterval(that.data.timer);
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          // clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }else{
        //每隔一秒countDownNum就减一，实现同步
        expiretime--;
        var mins= parseInt(expiretime/60)
        var seconds = expiretime % 60
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          expiretime: expiretime,
          mins: mins,
          seconds: seconds
        })}
      }, 1000)
  },
  getExpireTime(orderId){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/user/order/getKeyExpireTime',
      data:{
        orderId:orderId
      },
      success(res){
        that.setData({
          expiretime: res.data.data
        })
        that.countDown()
      }
    })
  },

  selectOrderById: function (e) {
    var orderId = e;
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/user/order/selectOrderById',
      data: {
        orderId: orderId
      },
      success(res) {
        that.setData({
          orderUserName: res.data.data.orderUserName,
          orderUserTelephone: res.data.data.orderUserTelephone,
          orderCreateTime: res.data.data.orderCreateTime,
          orderPayTime: res.data.data.orderPayTime
        })
      }
    })
  },

  // 支付按钮实现
  payOrder: function (event) {
    var orderPrice = event.currentTarget.dataset.orderprice;
    var roomName = event.currentTarget.dataset.roomname;
    var startOfDate = event.currentTarget.dataset.startdate;
    var orderId = event.currentTarget.dataset.orderid;
    console.log(orderId)
    wx.navigateTo({
      // url: '../bookHotel/bookHotel?price=' + room.roomPrice + '&hotelName=' + this.data.hotelName + '&roomName=' + room.roomName + '&startDate=' + startDate + '&endDate=' + endDate + '&roomNumber=' + room.roomNumber + '&hotelId=' + this.data.hotelId + '&roomId=' + room.roomId,
      url: '../payOrder/payOrder?orderPrice=' + orderPrice + '&roomName=' + roomName + '&startOfDate=' + startOfDate + '&orderId=' + orderId,
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