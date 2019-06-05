//index.js

Page({
  data: {
    networkType: '',
    accountNumber: 'TP-LINK_C599', //Wi-Fi 的SSID，即账号
    bssid: '', //Wi-Fi 的BSSID
    password: 'conglinfenggo', //Wi-Fi 的密码
    connet: true,
  },

  connectWifi: function () {
    var that = this;
    //检测手机型号
    wx.getSystemInfo({
      success: function (res) {
        var system = '';
        if (res.platform == 'android') system = parseInt(res.system.substr(8));
        if (res.platform == 'ios') system = parseInt(res.system.substr(4));
        if (res.platform == 'android' && system < 2) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }

        if (res.platform == 'ios' && system < 11.2) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        that.startWifi();
      }
    })
  },

  //初始化 Wi-Fi 模块
  startWifi: function () {
    var that = this;
    var flag;
    wx.startWifi({
      success: function () {
        that.Connected();
      },
      fail: function (res) {
        wx.showToast({
          title: '系统不兼容',
          icon: 'none',
        });
      }
    })
  },

  Connected: function () {
    var that = this
    wx.connectWifi({
      SSID: that.data.accountNumber,
      BSSID: that.data.bssid,
      password: that.data.password,
      success: function (res) {
        wx.showToast({
          title: 'wifi连接成功',
        });
        return true;
      },
      fail: function (res) {
        wx.showToast({
          title: '请检查是否打开wifi',
        });
        console.log(res.errMsg);
        return false;
      }
    });
  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
    });
    this.connectWifi();
  },

  go:function(){
    wx.redirectTo({
      url: '../scenes/scenes',
    })
  },

  
})