// wx.cloud.init({
//   env: 'poimap-lyx2c',
//   traceUser: true
// })

const app = getApp()
const db= wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      snacksList:[],
      snack:'',
    html:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let index = options.index
    console.log(index)
    that.setData({
      snacksList:app.globalData.snackArticle
    })
    console.log(that.data.snacksList[index])
    that.setData({
      snack: that.data.snacksList[index]
    })

    db.collection('source').get().then(res=>{
      
      that.setData({
        html: res.data[0].pagesource
      })
    }).catch(err=>{
      console.log(err)
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