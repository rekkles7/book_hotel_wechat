// pages/orderList/orderList.js
var open_id
Page({

     /**
      * 页面的初始数据
      */
     data: {
          stateList: [
               "全部", "待支付","待入住", "已入住", "已取消"
          ],
          common_row: {
               caption_class: 'caption',
               value_class: 'value'
          },
          selectedIndex: 0,

          //数据列表数组
          orderAll: undefined,
          orderToPay: undefined,
          orderTodo: undefined,
          orderDone: undefined,
          orderCancel: undefined,

          //是否可以上拉加载
          allLoadEnable: false,
          topayLoadEnable: false,
          todoLoadEnable: false,
          doneLoadEnable: false,
          cancelLoadEnable: false,

          //数据为空或请求失败的提示语
          allEmpty: '全部订单为空',
          topayEmpty: '待支付订单为空',
          todoEmpty: '未入住订单为空',
          doneEmpty: '已入住订单为空',
          cancelEmpty: '已取消订单为空',
          open_id
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.data.open_id = wx.getStorageSync('open_id')
          var pageType = options.type;
          if (pageType == 'all') {
               this.setData({
                    selectedIndex: 0,
                    orderAll: null
               });
               var that = this;
               var open_id = this.data.open_id;
               wx: setTimeout(function () {
                    wx.request({
                      url: 'http://127.0.0.1:8000/user/order/selectAllOrderByUserId',
                      data:{
                           userId: open_id
                      },
                      header: {
                         'content-type': 'application/json' // 默认值
                      },
                      success(res){
                         that.setData({
                              orderAll: res.data.data,
                         });
                         console.log(that.data.orderAll)
                      }
                    })
               }, 2000);
          } else if (pageType == 'todo') {
               this.setData({
                    selectedIndex: 2,
                    orderTodo: null
               });
               var that = this;
               var open_id = this.data.open_id;
               wx: setTimeout(function () {
                    wx.request({
                      url: 'http://127.0.0.1:8000/user/order/selectToPayOrderByUserIdAndSelectedIndex',
                      data:{
                           userId: open_id,
                           selectedIndex: that.data.selectedIndex
                      },
                      header: {
                         'content-type': 'application/json' // 默认值
                      },
                      success(res){
                         that.setData({
                              orderToDo: res.data.data,
                         });
                      }
                    })
               }, 2000);
          }
     },

     swiperChange: function (e) {
          var detailIndex = e.detail.current;
          var source = e.detail.source;
          if (this.selectedIndex != detailIndex && source == 'touch') {
               this.setData({
                    selectedIndex: detailIndex
               });
          }
     },

     turnPage: function (e) {
          var that = this;
          var dataIndex = e.currentTarget.dataset.index;
          var open_id = this.data.open_id;
          if (this.data.selectedIndex != dataIndex) {
               this.setData({
                    selectedIndex: dataIndex
               });
          } else {
               if (this.data.selectedIndex == 0) {
                    this.setData({
                         orderAll: null
                    });
                    wx: setTimeout(function () {
                         wx.request({
                           url: 'http://127.0.0.1:8000/user/order/selectAllOrderByUserId',
                           data:{
                                userId: open_id
                           },
                           header: {
                              'content-type': 'application/json' // 默认值
                           },
                           success(res){
                              that.setData({
                                   orderAll: res.data.data,
                              });
                           }
                         })
                    }, 2000);
               } else if (this.data.selectedIndex == 1){
                    var selectIndex = this.data.selectedIndex;
                    this.setData({
                         orderToPay: null
                    });
                    wx: setTimeout(function () {
                         wx.request({
                           url: 'http://127.0.0.1:8000/user/order/selectToPayOrderByUserIdAndSelectedIndex',
                           data:{
                                userId: open_id,
                                selectedIndex: selectIndex
                           },
                           header: {
                              'content-type': 'application/json' // 默认值
                           },
                           success(res){
                              that.setData({
                                   orderToPay: res.data.data,
                              });
                           }
                         })
                    }, 2000);
               } else if (this.data.selectedIndex == 2) {
                    var selectIndex = this.data.selectedIndex;
                    this.setData({
                         orderToDo: null
                    });
                    wx: setTimeout(function () {
                         wx.request({
                           url: 'http://127.0.0.1:8000/user/order/selectToPayOrderByUserIdAndSelectedIndex',
                           data:{
                                userId: open_id,
                                selectedIndex: selectIndex
                           },
                           header: {
                              'content-type': 'application/json' // 默认值
                           },
                           success(res){
                              that.setData({
                                   orderToDo: res.data.data,
                              });
                           }
                         })
                    }, 2000);
               } else if (this.data.selectedIndex == 3) {
                    var selectIndex = this.data.selectedIndex;
                    this.setData({
                         orderDone: null
                    });
                    wx: setTimeout(function () {
                         wx.request({
                           url: 'http://127.0.0.1:8000/user/order/selectToPayOrderByUserIdAndSelectedIndex',
                           data:{
                              userId: open_id,
                              selectedIndex: selectIndex
                           },
                           header: {
                              'content-type': 'application/json' // 默认值
                           },
                           success(res){
                              that.setData({
                                   orderDone: res.data.data,
                              });
                           }
                         })
                    }, 2000);
               }else{
                    var selectIndex = this.data.selectedIndex;
                    this.setData({
                         orderCancel: null
                    });
                    wx: setTimeout(function () {
                         wx.request({
                           url: 'http://127.0.0.1:8000/user/order/selectToPayOrderByUserIdAndSelectedIndex',
                           data:{
                              userId: open_id,
                              selectedIndex: selectIndex
                           },
                           header: {
                              'content-type': 'application/json' // 默认值
                           },
                           success(res){
                              that.setData({
                                   orderCancel: res.data.data,
                              });
                           }
                         })
                    }, 2000);
               }
     }
     },

     orderDetail: function(event){
          var orderStatus = event.currentTarget.dataset.orderstatus;
          var orderId = event.currentTarget.dataset.orderid;
          var hotelName = event.currentTarget.dataset.hotelname;
          var roomNumber = event.currentTarget.dataset.roomnumber;
          var roomName = event.currentTarget.dataset.roomname;
          var roomService = event.currentTarget.dataset.roomservice;
          var startOfDate = event.currentTarget.dataset.startdate;
          var endOfDate = event.currentTarget.dataset.enddate;
          var orderPrice = event.currentTarget.dataset.orderprice;
          wx.navigateTo({
               // url: '../bookHotel/bookHotel?price=' + room.roomPrice + '&hotelName=' + this.data.hotelName + '&roomName=' + room.roomName + '&startDate=' + startDate + '&endDate=' + endDate + '&roomNumber=' + room.roomNumber + '&hotelId=' + this.data.hotelId + '&roomId=' + room.roomId,
               url: '../orderDetail/orderDetail?orderId=' + orderId + '&orderStatus=' + orderStatus + '&hotelName=' + hotelName + '&roomNumber=' + roomNumber + '&roomName=' + roomName + '&roomService=' + roomService + '&startOfDate=' + startOfDate + '&endOfDate=' + endOfDate + '&orderPrice=' + orderPrice,
          })
     },
     toCommentPage:function(event){
          var orderId = event.currentTarget.dataset.orderid;
          var hotelName = event.currentTarget.dataset.hotelname;
          wx.navigateTo({
            url: '../comment/comment?orderId=' + orderId + '&hotelName=' + hotelName,
          })
     },
     updateOrder: function(event){
          var orderStatus = event.currentTarget.dataset.orderstatus;
          var orderId = event.currentTarget.dataset.orderid;
          var hotelName = event.currentTarget.dataset.hotelname;
          var roomNumber = event.currentTarget.dataset.roomnumber;
          var roomName = event.currentTarget.dataset.roomname;
          var roomService = event.currentTarget.dataset.roomservice;
          var startOfDate = event.currentTarget.dataset.startdate;
          var endOfDate = event.currentTarget.dataset.enddate;
          var orderPrice = event.currentTarget.dataset.orderprice;
          wx.navigateTo({
               // url: '../bookHotel/bookHotel?price=' + room.roomPrice + '&hotelName=' + this.data.hotelName + '&roomName=' + room.roomName + '&startDate=' + startDate + '&endDate=' + endDate + '&roomNumber=' + room.roomNumber + '&hotelId=' + this.data.hotelId + '&roomId=' + room.roomId,
               url: '../updateOrder/updateOrder?orderId=' + orderId + '&orderStatus=' + orderStatus + '&hotelName=' + hotelName + '&roomNumber=' + roomNumber + '&roomName=' + roomName + '&roomService=' + roomService + '&startOfDate=' + startOfDate + '&endOfDate=' + endOfDate + '&orderPrice=' + orderPrice,
          })
     },

     // tapName: function(event) {
     //      console.log("获取参数hi:",event.currentTarget.dataset.hi)
     //    },

     /**
      * 搜索订单
      */
     searchEvent: function (e) {

     },
     /**
      * 搜索框输入监听
      */
     inputListener: function (e) {

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