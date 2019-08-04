import { request } from "../../request/index.js";
import { wxLogin } from '../../utils/asyncWx'
import { setStorageToken } from '../../utils/storage'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  // 获取用户
  async getUserInfo(e) {
    try {
      const { signature, iv, rawData, encryptedData } = e.detail;

      const { code } = (await wxLogin());

      let postParams = { signature, iv, rawData, encryptedData, code }
      const { token } = (await request({ url: "/users/wxlogin", method: "post", data: postParams }));

      // console.log(token);
      setStorageToken(token)

      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error);
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