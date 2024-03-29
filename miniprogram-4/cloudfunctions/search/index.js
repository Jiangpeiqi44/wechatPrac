// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()


const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('hello').where({
    tag: event.tag
  }).get()
}