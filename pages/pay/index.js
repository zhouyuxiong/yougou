// pages/cart/index.js
import { getStorageToken } from '../../utils/storage'
import { request } from '../../request/index'
import { requestPayment, showToast } from '../../utils/asyncWx'
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
  async handleOrderPay() {
    try {
      const token = getStorageToken();
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return;
      }

      const header = { Authorization: token }
      let cartArr = Object.values(this.data.cart)

      // 封装请求体
      const createOrderParams = () => {
        let order_price = this.data.totalPrice;
        let consignee_addr = this.data.address.all;
        let goods = [];

        cartArr.forEach(v => {
          if (v.checked) {
            goods.push({
              goods_id: v.goods_id,
              goods_number: v.num,
              goods_price: v.goods_price
            })
          }
        })

        return { order_price, consignee_addr, goods }
      }

      const { order_number } = await request({ url: '/my/orders/create', method: 'post', data: createOrderParams(), header })
      // console.log(order_number);
      const { pay } = await request({ url: '/my/orders/req_unifiedorder', method: 'post', data: { order_number }, header })
      // console.log(pay);
      const res = await requestPayment(pay)
      // console.log(res);
      const res2 = await request({ url: '/my/orders/chkOrder', method: 'post', data: { order_number }, header })
      // console.log(res2);

      await showToast({ title: '支付成功' })
    } catch (error) {
      await showToast({ title: '支付失败' })
      console.log(error);
    }

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