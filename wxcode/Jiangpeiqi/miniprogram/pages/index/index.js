Page({
  data: {
    inputValue1: "",
    color: '#808080'
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
    if (this.data.inputValue1 > 20) {
      db.collection("decide").add({
        data: {
          input1: input1,

        },
        success: function (res) {
          console.log(res)
        },

      }),
        this.setData({
          color: '#008000'
        }) 
    }

    else{
      this.setData({
        color: '#ff0000'
      }) 
    }


  },

})