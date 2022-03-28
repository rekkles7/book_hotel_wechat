// pages/minePage/minePage.js
var app = getApp();
var isLoginSuccess = false;

Page({

     data: {
          hasUserInfo: false,
          userInfo: null,
          canIUseGetUserProfile: false
     },

     onLoad: function () {
          console.log(111)
     },
     // /**
     //  * 生命周期函数--监听页面加载
     //  */
     // onLoad: function (options) {
     //      // this.initLoginMsg();
     // },
     getUserProfile(e){
          wx.getUserProfile({
               desc: '用于完善会员资料',
               success: (login_res) => {
                    this.setData({
                         userInfo: login_res.userInfo,
                         hasUserInfo: true
                       })
                    wx.login({
                         success: function(res) {
                              // 2. 小程序通过wx.request()发送code到开发者服务器
                              wx.request({
                                   url: 'http://localhost:8080/user/wx/login',
                                   method: 'POST',
                                   header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                   },
                                   data: {
                                        code: res.code, //临时登录凭证
                                        rawData: login_res.rawData, //用户非敏感信息
                                        signature: login_res.signature, //签名
                                        encrypteData: login_res.encryptedData, //用户敏感信息
                                        iv: login_res.iv //解密算法的向量
                                   },
                                   success: function (rres) {
                                        if (rres.data.status == 200) {
                                             // 7.小程序存储skey（自定义登录状态）到本地
                                             wx.setStorageSync('userInfo', login_res.userInfo);
                                             //wx.setStorageSync('skey', rres.data.data);
                                             wx.setStorageSync('open_id', rres.data.data)
                                        } else {
                                             console.log('服务器异常');
                                        }
                                   },
                                   fail: function (error) {
                                        //调用服务端登录接口失败
                                        console.log(error);
                                   }
                              })
                         }
                    })
               }
          })
     },

     previewHead: function () {
          wx.previewImage({
               current: this.data.userInfo.avatarUrl,
               urls: [this.data.userInfo.avatarUrl]
          })
     },

     // loginTap: function () {
     //      var that = this;
     //      if (!isLoginSuccess) {
     //           wx.showLoading({
     //                title: '正在登录...',
     //           })
     //           // 登录
     //           wx.login({
     //                success: res => {
     //                     // 发送 res.code 到后台换取 openId, sessionKey, unionId
     //                }
     //           })
     //           // 获取用户信息
     //           wx.getSetting({
     //                success: res => {
     //                     wx.hideLoading();
     //                     if (res.authSetting['scope.userInfo']) {
     //                          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
     //                          wx.getUserInfo({
     //                               success: res => {
     //                                    // 可以将 res 发送给后台解码出 unionId
     //                                    app.globalData.userInfo = res.userInfo

     //                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
     //                                    // 所以此处加入 callback 以防止这种情况
     //                                    if (app.userInfoReadyCallback) {
     //                                         app.userInfoReadyCallback(res)
     //                                    }
     //                                    that.initLoginMsg();
     //                               },
     //                               fail: res => {
     //                                    wx.hideLoading();
     //                                    isLoginSuccess = false;
     //                                    that.setData({
     //                                         userTitle: '点击登录',
     //                                         userHead: '../../res/images/ic_mine_normal.png'
     //                                    })
     //                               }
     //                          })
     //                     }
     //                }
     //           })
     //      }
     // },

     // initLoginMsg: function () {
     //      if (app.globalData.userInfo) {
     //           isLoginSuccess = true;
     //           this.setData({
     //                userHead: app.globalData.userInfo.avatarUrl,
     //                userTitle: '尊贵的，' + app.globalData.userInfo.nickName
     //           })
     //      } else if (this.data.canIUse) {
     //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
     //           // 所以此处加入 callback 以防止这种情况
     //           isLoginSuccess = true;
     //           app.userInfoReadyCallback = res => {
     //                this.setData({
     //                     userHead: res.userInfo.avatarUrl,
     //                     userTitle: '尊贵的，' + res.userInfo.nickName
     //                })
     //           }
     //      } else {
     //           // 在没有 open-type=getUserInfo 版本的兼容处理
     //           wx.getUserInfo({
     //                success: res => {
     //                     isLoginSuccess = true;
     //                     app.globalData.userInfo = res.userInfo
     //                     this.setData({
     //                          userHead: res.userInfo.avatarUrl,
     //                          userTitle: '尊贵的，' + res.userInfo.nickName
     //                     })
     //                },
     //                fail() {
     //                     isLoginSuccess = false;
     //                     this.setData({
     //                          userTitle: '点击登录',
     //                          userHead: '../../res/images/ic_mine_normal.png'
     //                     })
     //                }
     //           })
     //      }
     // },

     allOrderTap: function () {
          wx.navigateTo({
               url: '../orderList/orderList?type=all',
          })
     },

     todoOrderTap: function () {
          wx.navigateTo({
               url: '../orderList/orderList?type=todo',
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