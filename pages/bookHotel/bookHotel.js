// pages/bookHotel/bookHotel.js

var roomPrice;
var hotelName;
var roomName;
var startDate;
var endDate;
var roomNumber;
var num;
var plusStatus;
var time;
var orderPrice;
var version;
var open_id;
var hotelId;
var roomId;
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
          isDiscount: false,
          roomPrice,
          open_id,
          hotelName,
          roomName,
          startDate,
          endDate,
          roomId,
          num,
          roomNumber,
          discount: '不选择优惠',
          minusStatus: 'disabled',
          plusStatus,
          orderPrice,
          orderUserName,
          orderUserTelephone,
          orderUserPs,
          version,
          time: '13:00',
          form:{
               orderUserName: '',
               orderUserTelephone: '',
               orderUserPs: ''
          }
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
     createOrder: function(){
          wx.request({
            url: 'http://127.0.0.1:8000/user/order/saveOrder',
            method: 'post',
            data:{
                 openId: open_id,
                 startOfDate: startDate,
                 endOfDate: endDate,
                 orderPrice: orderPrice,
                 hotelId: hotelId,
                 roomId: roomId,
                 orderUserName: this.data.form.orderUserName,
                 orderUserTelephone: this.data.form.orderUserTelephone,
                 orderUserPs: this.data.form.orderUserPs,
                 orderRoomNumber: this.data.num,
                 version: version
            },
            header:{
                 "Content-Type":"application/x-www-form-urlencoded"
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
     bindMinus: function() {  
          var num = this.data.num;
          var maxNum = this.data.roomNumber;
          // 如果大于1时，才可以减  
          if (num > 1) {  
               num --;  
          }  
          // 只有大于一件的时候，才能normal状态，否则disable状态  
          var minusStatus = num <= 1 ? 'disabled' : 'normal'; 
          var plusStatus = num >= maxNum ? 'disabled' : 'normal';
          // 将数值与状态写回  
          this.setData({  
               num: num,  
               minusStatus: minusStatus,
               plusStatus: plusStatus
          });
          var orderPrice = num * roomPrice;
          this.setData({
               orderPrice: orderPrice
          })

      },  
      /* 点击加号 */  
      bindPlus: function() {  
          var num = this.data.num;  
          var maxNum = this.data.roomNumber;
          if (num < maxNum) {  
               num ++;  
           } 
          // 只有大于一件的时候，才能normal状态，否则disable状态  
          var plusStatus = num >= maxNum ? 'disabled' : 'normal';
          var minusStatus = num <= 1 ? 'disabled' : 'normal'; 
          // 将数值与状态写回  
          this.setData({  
               num: num,  
               plusStatus: plusStatus,
               minusStatus: minusStatus
          });  
          var orderPrice = num * roomPrice;
          this.setData({
               orderPrice: orderPrice
          })
      },
      bindManual: function(e) {  
          var num = e.detail.num;  
          // 将数值与状态写回  
          this.setData({  
               num: num  
          });  
      } ,
      initValidate(){
           const rule={
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
           const message={
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
           this.WxValidate = new WxValidate(rule,message)
      },
      showModal(error){
           wx.showModal({
                content: error.msg,
                showCancel: false,
           })
      },
      formSubmit:function(e){
           const params = e.detail.value
           if(!this.WxValidate.checkForm(params)){
                const error = this.WxValidate.errorList[0]
                this.showModal(error)
                return false
           }else{
                this.createOrder()
           }
      },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          console.log(options);
          hotelId = options.hotelId;
          roomPrice = options.price;
          hotelName = options.hotelName;
          roomName = options.roomName;
          startDate = options.startDate;
          endDate = options.endDate;
          version = options.version;
          roomNumber = options.roomNumber;
          open_id = wx.getStorageSync('open_id')
          num = 1;
          orderPrice = options.price;
          roomId = options.roomId;
          console.log(options.version)
          if(roomNumber==1){
               this.setData({
                   plusStatus: 'disabled' 
               })
          }else{
               this.setData({
                    plusStatus: 'normal'
               })
          }
          this.setData({
               roomPrice: roomPrice,
               hotelName: hotelName,
               roomName: roomName,
               startDate: startDate,
               endDate: endDate,
               roomNumber: roomNumber,
               num: 1,
               orderPrice: orderPrice,
               hotelId: hotelId,
               open_id: open_id,
               roomId: roomId,
               version: version
          });
          this.initValidate()
     },

     bindTimeChange: function(e) {
          console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
            time: e.detail.value
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