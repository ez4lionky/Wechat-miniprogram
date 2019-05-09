//index.js

Page({
  data: {

  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
    })
  },
  go:function(){
    wx.redirectTo({
      url: '../scenes/scenes',
    })
  }
})