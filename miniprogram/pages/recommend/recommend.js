// 云函数入口文件
const db = wx.cloud.database();
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: [
      {name:'牛肉丸',
      shopName:'牛肉丸世家',
      category:'牛肉',
        imageUrl:'https://mmbiz.qpic.cn/mmbiz_jpg/BZUb7VdvqYxOINEuSMGLP5j8osyEn7OTRdrFAOiazFmUYpxVZl50h0VuAvWe3YpWV3k9km1UDQd2kP5ghtNKFcA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
      },
      {
        name:'肠粉',
        shopName:'时光解馋坊',
        category:'肠粉',
        imageUrl:'https://mmbiz.qpic.cn/mmbiz_png/pkm06nQ34NR5aDaWqib3EXQvwyxwNcCtzuwWv49CFDdiafzMTNfal19k5PRXtpuqnbokP8FLbVFSm8bNHPQRgHjQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
      }
                ],
      snacks:[]

  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  getSnackList(limit){
    wx.showLoading({
      title: '加载中',
    })
    console.log('skip:'+this.data.snacks.length)
    console.log('limit:'+limit)
    wx.cloud.callFunction({
      name: 'getSnack',
      data: {
        skip: this.data.snacks.length,
        limit:limit
      }
    }).then(res => {
      console.log(res)
     
      this.setData({
        snacks: this.data.snacks.concat(res.result.data)   //拼接到snack后面  追加 的意思
      })
      app.globalData.snackArticle = this.data.snacks   //赋值到全局变量
    }).catch(err => {
      console.log(err)
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSnackList(10);  //调用云函数获取小吃文章 首次次10条

  },
 
  //点击切换，滑块index赋值
  
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
    this.getSnackList(5)
    wx.showToast({
      title: '加载完成',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})