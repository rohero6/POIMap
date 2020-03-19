// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  env: 'poimap-lyx2c',
  traceUser: true
})


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  
    return await db.collection('snackList').field({
      title:true,
      pagesource:true
    }).skip(event.skip).limit(event.limit).get()
 

  
}