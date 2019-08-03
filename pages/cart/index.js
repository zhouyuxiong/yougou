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
    isAllChecked: false,
    totalNum: 0,
    totalPrice: 0,
    hasCart: false
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
    } else {
      await openSetting()
    }
    const address = await chooseAddress()
    // 拼接完整的地址
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    wx.setStorageSync('address', address);
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
    // every 空数组为true
    let isAllChecked = cartArr.length ? cartArr.every(v => v.checked) : false
    let totalNum = 0
    let totalPrice = 0
    cartArr.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      }
    })

    let hasCart = cartArr.length ? true : false
    this.setData({ cart, isAllChecked, totalNum, totalPrice, hasCart })
    wx.setStorageSync('cart', cart);

  },

  // 点击切换复选框
  handleCartCheck(e) {
    // console.log(e.currentTarget.dataset.id);
    const { id } = e.currentTarget.dataset;
    let { cart } = this.data;
    cart[id].checked = !cart[id].checked
    this.setCart(cart)
  },

  // 点击增加减少数量
  async handleCartNumEdit(e) {
    // console.log(e);
    let { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;

    if (operation === -1 && cart[id].num === 1) {
      const res = await showModal({ content: "您确定要删除吗？" })
      if (res.confirm) {
        delete cart[id]
        this.setCart(cart)
      }
      /* wx.showModal({
        title: '提示',
        content: '您确定要删除吗？',
        success: (result) => {
          if (result.confirm) {
            delete cart[id]
            this.setCart(cart)
          }
        }
      }) */
    } else {
      cart[id].num += operation
      this.setCart(cart)
    }
  },

  // 全选反选功能
  handleAllCheck() {
    let { cart, isAllChecked } = this.data;
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = !isAllChecked;
      }
    }
    this.setCart(cart)
  },

  // 结算
  handlePay() {
    let { address, cart } = this.data;
    let cartArr = Object.values(cart);
    let hasCheckedCart = cartArr.some(v => v.checked)
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        mask: true
      });
    } else if (!hasCheckedCart) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        mask: true
      });
    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      });
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