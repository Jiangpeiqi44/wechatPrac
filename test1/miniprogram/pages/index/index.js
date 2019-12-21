Page({
  data :{
 inputValue1:"",
  inputValue2:"",
  result:"未输入"
  },

  input1:function(e)
  {
    var value=e.detail.value
    this.setData({
      inputValue1:value
    })
    
  },

  input2:function(e)
  {
    var value = e.detail.value
    this.setData({
      inputValue2: value
    })
  },
calculate:function(){
  var input1=this.data.inputValue1;
  var input2 = this.data.inputValue2;
  console.log(input1.length+input2.length)
  this.setData({
    result: input1.length + input2.length
  })


},

  upload: function (){
    var input1 = this.data.inputValue1;
    var input2 = this.data.inputValue2;

    var db= wx.cloud.database()
    db.collection("calculator").add({
      data:{
        input1:input1,
        input2:input2,
      },
      success:function(res){
        console.log(res)
      }
    })
  },
read:function(){
  var that=this;
  wx.cloud.callFunction({
    name:"read",
    success: function (res) {
    var result=  res.result.data[res.result.data.length-1]
    console.log(result)
    that.setData({
      inputValue1:result.input1,
      inputValue2: result.input2
    })
    }
     
  })
}
})