//index.js

const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    latitude: 23.657900,
    longitude: 116.622090,
    keywords: '餐饮',
    markers: [],
    hotKeys:['美食','景点','停车场','厕所','客栈'],
    showHot:false
  },
  toaddress: function (e) {
    let _this = this
    var id = e.markerId
    wx.openLocation({
      latitude: _this.data.markers[id].latitude,
      longitude: _this.data.markers[id].longitude,
      name: _this.data.markers[id].title,
      address: _this.data.markers[id].address,
    })
    // wx.navigateTo({
    //   url: '/pages/index/index',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  showHot(){
    this.setData({
      showHot:true //显示热词
    })
  },

  wxSearchKeyTap(e){ //热点词搜索
    var that = this;
    that.setData({
      keywords : e.target.dataset.key
    })
    that.searchAll()

  },
  tomap:function(event){
    let plugin = requirePlugin('routePlan');
    let key = 'LPHBZ-RDFCU-4NOV4-2LK6R-DHKY5-R5BNO';  //使用在腾讯位置服务申请的key
    let referer = '潮州美食map';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': event.target.dataset.mapdel.title,
      'latitude': event.target.dataset.mapdel.latitude,
      'longitude': event.target.dataset.mapdel.longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });

   
  },
  onChange(e){//设置搜索的关键词
    this.setData({
      keywords: e.detail
    });
  
  },
  
  searchAll(){
    let that = this
    that.setData({
      markers:[]//重新搜索把之前列表清空
    })
    wx.showLoading({
      title: '加载中',
    })
    qqmapsdk.search({
      location: that.data.latitude+','+that.data.longitude,
      keyword: that.data.keywords,
      success: function (res) {
        console.log(res)
       let count = res.count   //获取本次搜索得总数计算出分页数
       let pages = Math.ceil(count / 20) //把总数除最大限制数且向上取整
        for (let i = 1; i <= 5; i++) {
          that.onSearch(i)   //分页去搜索，并设置定时器避免触发高并发
        }
        wx.hideLoading()
        wx.showToast({
          title: '加载完成，最多显示100条',

        })
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading()//隐藏loading
      },
      complete: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '最多显示100条',

        })
      }
    });
  },
  sleep: function (numberMillis) { //延时作用
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  },
  onSearch(page){ //真正搜索结果
    var that = this;
    var m = []; //临时搜索结果列表
    let startid = 20*(page-1)
    that.sleep(10)
     qqmapsdk.search({
       location: that.data.latitude + ',' + that.data.longitude, //以潮州为中心搜索
       keyword: that.data.keywords,     //搜 索框关键词
       page_size: 20,   //结果返回条数 最多20
       page_index: page, //搜索得index_page(第几页)
       success: function (res) {
         for (var i = 0; i < res.data.length; i++ , startid++) {
           var marker = {}
           marker.iconPath = '../../images/点.png' //图标
           marker.latitude = res.data[i].location.lat; //标注点坐标
           marker.longitude = res.data[i].location.lng;
           marker.id = startid  //标注id    
           marker.tel = res.data[i].tel //电话
           marker.address = res.data[i].address  //地址
           marker.category = res.data[i].category  //种类
           marker.title = res.data[i].title  //店名
           marker.distance = (res.data[i]._distance/1000).toFixed(2)
           marker.callout = {
             content: "", //气泡内容
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
           marker.callout.content = res.data[i].title //气泡显示内容
          // console.log(marker)
           m.push(marker)   //marker添加进列表
           
         }
         console.log(page)
         console.log(m)
         that.setData({
           showHot:false,
           markers: that.data.markers.concat(m)  //列表拼接赋值给markers
         });

       },
     });
    
   
  },
  getSetting: function () { //获取用户的当前设置
    const that = this
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      wx.getLocation({
                        success: function(res) {
                          that.setData({
                            latitude: res.latitude,
                            longitude: res.longitude,
                          })
                        },
                      })

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          wx.getLocation({
            success: function (res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
              })
            },
          })
          
        }
        else {
          //调用wx.getLocation的API
          wx.getLocation({
            success: function (res) {
              that.setData({
                latitude: res.latitude,
                longitude: res.longitude,
              })
            },
          })
        }
      }
    })
  },

  onLoad: function() {
    const that = this
    this.getSetting()
    qqmapsdk = new QQMapWX({
      key: 'LPHBZ-RDFCU-4NOV4-2LK6R-DHKY5-R5BNO'
    }),

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    }),
    //获取地理信息
    wx.getLocation({
      success: function (res) {
        var lat = res.latitude
        var log = res.longitude
        that.setData({
          latitude: lat,
          longitude: log
        });
      },
    }),
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
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  }


})