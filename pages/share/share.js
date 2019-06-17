// pages/share/share.js
const app = new getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    portrait_temp: '',
    bgPath: '../../utils/image/bg.png',
    qrcode_temp: '../../utils/image/qr.png',
    windowWidth: 400,
    windowHeight: 600,
    qrcode_temp: '../../utils/image/qr.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    wx.showShareMenu({
      withShareTicket: true
    })

    wx.getSystemInfo({
      success(res) {
        that.windowWidth = res.windowWidth;
        that.windowHeight = res.windowHeight;
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 分享事件
   */
  shareImage(event) {
    //缓存canvas绘制小程序二维码
    that.drawImage();
    wx.hideLoading();
    setTimeout(function() {
      that.canvasToImage()
    }, 200)
  },
  drawImage() {
    //绘制canvas图片    
    const ctx = wx.createCanvasContext('myCanvas')
    var bgPath = that.data.bgPath
    var portraitPath = that.data.portrait_temp
    var hostNickname = 'test'

    var qrPath = that.data.qrcode_temp
    var w = that.data.windowWidth
    var h=that.data.windowHeight
    that.setData({
      scale: 1.6
    })
    //绘制背景图片
    ctx.drawImage(bgPath, w * 0.025, h*0.025, w*0.95, h*0.95)

    //生成头像/logo
    ctx.drawImage(qrPath, w*0.1, w*0.1, 80, 80)

    //生成用户ID / 文字
    ctx.setFillStyle('#000000')
    ctx.setFontSize(12)
    ctx.setTextAlign('left')
    ctx.fillText('这里显示用户ID', w*0.32, h*0.1)

    ctx.setFillStyle('#000000')
    ctx.setFontSize(12)
    ctx.setTextAlign('left')
    ctx.fillText('喜欢的好物，分享给你', w * 0.32, h * 0.15)

    //生成商品图片
    ctx.drawImage('../../utils/image/product.png', w*0.1, h*0.25, w * 0.8, h*0.47)

    //绘制二维码
    ctx.drawImage(qrPath, w*0.55, h*0.75, 80, 80)
    //点击识别查看商品
    ctx.setFillStyle('#000000')
    ctx.setFontSize(12)
    ctx.setTextAlign('center')
    ctx.fillText('长按识别查看商品', w * 0.65, h * 0.92)

    ctx.draw();
  },
  canvasToImage() {
    var that = this
    console.log()
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth,
      height: that.data.windowWidth * that.data.scale,
      destWidth: that.data.windowWidth * 4,
      destHeight: that.data.windowWidth * 4 * that.data.scale,
      canvasId: 'myCanvas',
      success: function(res) {
        console.log('朋友圈分享图生成成功:' + res.tempFilePath)
        wx.previewImage({
          current: 'www.ooago.com', // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })
      },
      fail: function(err) {
        console.log('失败')
        console.log(err)
      }
    })
  },

})