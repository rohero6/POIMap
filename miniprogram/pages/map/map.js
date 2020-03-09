// miniprogram/pages/map/map.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    markers: [],
    keywords: '餐饮'
  
  },
  onSearch:function(e){
    this.setData({
      keywords: e.detail
    });
    this.searchFood()
  },
  toaddress: function (e) {
    let _this = this
    console.log(e)
    var id = e.markerId
    console.log(id)
    wx.openLocation({
      latitude: _this.data.markers[id].latitude,
      longitude: _this.data.markers[id].longitude,
    })
    // wx.navigateTo({
    //   url: '/pages/index/index',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  searchFood:function(){
    var that = this;
    var m = [];
    // 调用接口
    // var mark= {
    //       id: 0,
    //       latitude: '',
    //       longitude: '',
    //       callout: {
    //           content: "",
    //           padding: 10,
    //           display: 'ALWAYS',
    //           textAlign: 'center'}};
    qqmapsdk.search({
      location:that.data.latitude + "," + that.data.longitude,
      keyword: that.data.keywords,
      page_size: 20,
      success: function (res) {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          var marker = {}
          marker.iconPath = '../../images/位置.png'
          marker.latitude = res.data[i].location.lat;
          marker.longitude = res.data[i].location.lng;
          marker.id = i
          marker.width = 40
          marker.height = 40
          marker.label = {
            content: "",
            padding: 3,
            x: 20,
            y: -40,
            color: '#ffffff',  //文本颜色
            borderRadius: 5,  //边框圆角
            borderWidth: 1,  //边框宽度
            borderColor: '#CC7033',  //边框颜色
            bgColor: '#CC7033',  //背景色
            display: 'ALWAYS',
            textAlign: 'center'
          }
          marker.label.content = res.data[i].title
          console.log(marker)
          m.push(marker)
        }
        //console.log(m)
        that.setData({
          markers: m
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload');
    var that = this;
    wx.getLocation({
      success: function(res) {
        var lat = res.latitude
        var log = res.longitude
        that.setData({
          latitude: lat,
          longitude: log
        });
      },
    })
    wx.chooseLocation({
      success: function (res) {
       var lat = res.latitude
       var log = res.longitude
        that.setData({
          latitude: lat,
          longitude: log
        });
        
      },
    })
   
    qqmapsdk = new QQMapWX({
      key: 'LPHBZ-RDFCU-4NOV4-2LK6R-DHKY5-R5BNO'
    });
    var sy = wx.getSystemInfoSync(),
      mapWidth = sy.windowWidth * 2,
      mapHeight = sy.windowHeight * 2;
    this.setData({
      mapWidth: mapWidth,
      mapHeight: mapHeight
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onreadey');
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.moveToLocation()
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log('onshow');
    that.searchFood()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})