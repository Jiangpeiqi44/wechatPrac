Page({
  data: {
    hw: "Hello Javascript",
    word1: "Hello",
    word2: "World",
    word3: "你好",
    word4: "世界",


    count: 0,
    show_input: ''
  },

  addOne: function () {
    this.setData({
      count: this.data.count + 1
    })
  },

  submitFunc: function (e) {
    this.setData({
      show_input: e.detail.value.input_word
    })
  }
})