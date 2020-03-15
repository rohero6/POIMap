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
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //获取当前滑块的index
  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,

    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})