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
var orderUserName;
var orderUserTelephone;
var orderUserPs;
let validate = null;
import WxValidate from '../../utils/WxValidate.js'
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
    form:{
      orderUserName: '',
      orderUserTelephone: '',
      orderUserPs: ''
 }
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
    this.initValidate()
  },
  orderUserNameInput: function(e){
    this.setData({
         'form.orderUserName':e.detail.value
    })
    console.log("入住人为："+this.data.form.orderUserName)
},
orderUserTelephoneInput: function(e){
    this.setData({
         'form.orderUserTelephone':e.detail.value
    })
    console.log("电话为"+this.data.form.orderUserTelephone)
},
orderUserPsInput: function(e){
    this.setData({
         'form.orderUserPs':e.detail.value
    })
    console.log("备注信息为"+this.data.form.orderUserPs)
},
  initValidate() {
    const rule = {
      orderUserName: {
        required: true,
        minlength: 2
      },
      orderUserTelephone: {
        required: true,
        tel: true
      },
      orderUserPs: {
        required: true
      }
    }
    const message = {
      orderUserName: {
        required: '入住人不能为空',
        minlength: '请输入正确的姓名'
      },
      orderUserTelephone: {
        required: '手机号码不能为空',
        tel: '请填写正确的手机号码'
      },
      orderUserPs: {
        required: '备注信息不能为空，若无备注，请填写无'
      }
    }
    this.WxValidate = new WxValidate(rule, message)
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  formSubmit: function (e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      this.updateOrder()
    }
  },
  updateOrder: function(){
    wx.request({
      url: 'http://127.0.0.1:8000/user/order/updateOrder',
      method: 'get',
      data:{
           orderId: orderId,
           orderUserName: this.data.form.orderUserName,
           orderUserTelephone: this.data.form.orderUserTelephone,
           orderUserPs: this.data.form.orderUserPs,
      },
      success: function(res){
         wx.showToast({
              title: "成功", // 提示的内容
              icon: "success", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 3000, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
              success: function () {
                   setTimeout(function(){
                        wx.switchTab({
                          url: '../minePage/minePage',
                        })
                   },2000)
              },
              fail: function () {
                  console.log("接口调用失败的回调函数");
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