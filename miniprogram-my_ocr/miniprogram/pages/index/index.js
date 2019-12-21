// start.js

Page({

  /**
   * 页面的初始数据
   */
 

  send: function () {
    var that = this
    //取得门限数据和报警规则

    //调用百度天气API
    // 就是这里需要改动

    var theBaiDuAPPkey = "oursparkspace" //百度的APPkey

    const requestTask = wx.request({
      url: 'http://10.3.240.214:58000/mail?apikey=oursparkspace' + theBaiDuAPPkey, //百度天气API
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      data: {
        type: "ems",
        post: "123423643",
      },

      success: function (res) {
        console.log(res.data)
      },
});}
  })