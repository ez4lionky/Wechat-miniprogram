//index.js

Page({
  data: {
    networkType: '',
    accountNumber: 'TP-LINK_C599', //Wi-Fi 的SSID，即账号
    bssid: '', //Wi-Fi 的BSSID
    password: 'conglinfenggo', //Wi-Fi 的密码
    connet: true,
    local_url: '192.168.0.111:8080',
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
          icon: 'none',
        });
        console.log(res.errMsg);
        return false;
      }
    });
  },
  logIn: function (){
    var that = this;
    wx.login({
      success: function (res) {
        console.log("res.code=====" + res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://' + that.data.local_ip,
            method: "POST",
            success: function (res) {
              that.setData({
                openid: res.data.openid
              })
            },
            fail(res) {
              console.log(res.errMsg);
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
    });
    this.connectWifi();
    this.logIn();
  },

  go:function(){
    wx.redirectTo({
      url: '../scenes/scenes',
    })
  },

  
})