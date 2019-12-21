Page({
  data: {
    inputValue1: "",
  
    result:''
  },

  input1: function (e) {
    var value = e.detail.value
    this.setData({
      inputValue1: value
    })

  },

  upload: function () {
    var input1 = this.data.inputValue1;
    var db = wx.cloud.database()
    if (this.data.inputValue1 > 10) {
      db.collection("test2").add({
        data: {
          input1: input1,

        },
        success: function (res) {
          console.log(res)
        },

      }),
        this.setData({
        result: "true"
        })
    }

    else {
      this.setData({
        result: "false"
      })
    }


  },

})