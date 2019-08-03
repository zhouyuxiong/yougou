// pages/cart/index.js
import { getSetting, openSetting, chooseAddress, showModal } from '../../utils/asyncWx'

import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: {},
    totalNum: 0,
    totalPrice: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address = wx.getStorageSync('address') || {};
    const cart = wx.getStorageSync("cart") || {};
    this.setData({ address })
    this.setCart(cart)
  },
  // 封装改变cart isAllChecked,totalNum,totalPrice的方法
  setCart(cart) {
    // 转化为数组
    let cartArr = Object.values(cart)
    let totalNum = 0
    let totalPrice = 0
    cartArr.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      }
    })

    this.setData({ cart, totalNum, totalPrice })
    wx.setStorageSync('cart', cart);

  },

  // 支付
  handleOrderPay() {

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