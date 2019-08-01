// pages/cart/index.js
import { getSetting, openSetting, chooseAddress } from '../../utils/asyncWx'

import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取收获地址
  /* handleChooseAddress() {
    wx.getSetting({
      success(res1) {
        const scopeAddress = res1.authSetting['scope.address']
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res2) => {
              console.log(res2);
            }
          })
        } else {
          wx.openSetting({
            success: (res) => {
              wx.chooseAddress({
                success: (res2) => {
                  console.log(res2);
                }
              })
            }
          })
        }
      }
    })
  }, */

  async handleChooseAddress() {
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting['scope.address']
    if (scopeAddress === true || scopeAddress === undefined) {
      const res2 = await chooseAddress()
      console.log(res2);
    } else {
      await openSetting()
      const res2 = await chooseAddress()
      console.log(res2);
    }
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