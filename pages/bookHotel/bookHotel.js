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
Page({

     /**
      * 页面的初始数据
      */
     data: {
          isDiscount: false,
          roomPrice,
          hotelName,
          roomName,
          startDate,
          endDate,
          num,
          roomNumber,
          discount: '不选择优惠',
          minusStatus: 'disabled',
          plusStatus,
          orderPrice,
          time: '13:00'
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
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          console.log(options);
          roomPrice = options.price;
          hotelName = options.hotelName;
          roomName = options.roomName;
          startDate = options.startDate;
          endDate = options.endDate;
          roomNumber = options.roomNumber;
          num = 1;
          orderPrice = options.price;
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
               orderPrice: orderPrice
          });
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