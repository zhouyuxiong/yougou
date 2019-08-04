// pages/order/index.js
import { getStorageToken } from '../../utils/storage'
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList: []
  },

  // tab切换
  handleTitleChange(e) {
    // console.log(e.detail.index);
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({ tabs })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = getStorageToken();
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    let currentList = getCurrentPages();
    // console.log(currentList);
    let { type } = currentList[currentList.length - 1].options;
    // console.log(type);
    this.getOrderList(type);
  },

  async getOrderList(type) {
    let { orders } = await request({ url: "/my/orders/all", data: { type } });
    // console.log(orders);
    this.setData({ orderList: orders })
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