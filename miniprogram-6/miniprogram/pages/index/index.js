const app = getApp()


Page({
  data: {
    contents: ""
  },
  onLoad: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }


    //初始化数据库
    const db = wx.cloud.database()
    //向数据库添加一条记录
    db.collection('hello').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        content: "Hello world!!",
        tag: 1
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    }


    var _this = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'search',
      // 传给云函数的参数
      data: {
        tag: 2
      },
      success: function (res) {
        console.log(res.result)
        _this.setData({
          contents: res.result.data[2].content
        })
      },
      fail: console.error
    })
  }
})