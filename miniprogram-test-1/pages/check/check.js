// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '', // url transmitted by the server
    scene: 0  // the id of scene selected, transmitted by the server
  },
  jumpToPay: function (option) {
    // Payment API
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cancel: function (e) {
    wx.navigateTo({
      url: '../scenes' + '/scenes' + '?scene=' + this.data.scene
    });
  },
  onLoad: function (option) {
    this.setData({
      scene: option.scene,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})