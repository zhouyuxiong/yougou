import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

import { getStorageCart, setStorageCart } from '../../utils/storage'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 返回的接口数据
  GoodsInfo: {},

  // 点击预览图片
  handlePreviewImage(e) {
    const { index } = e.currentTarget.dataset;
    const urls = this.data.goodsObj.pics.map(v => v.pics_big);
    const current = urls[index]
    wx.previewImage({
      current,
      urls
    });

  },
  // 点击加入购物车
  handelTap() {
    let cart = getStorageCart() || {};

    if (!cart[this.GoodsInfo.goods_id]) {
      cart[this.GoodsInfo.goods_id] = this.GoodsInfo
      cart[this.GoodsInfo.goods_id].num = 1
    } else {
      cart[this.GoodsInfo.goods_id].num++
    }
    // 把添加的购物车数据本地存储
    setStorageCart(cart);

    wx.showToast({
      title: '添加成功',
      icon: 'none',
      // 遮罩层
      mask: true
    });


  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } })
    // console.log(res);
    this.GoodsInfo = res
    this.setData({
      goodsObj: {
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        pics: res.pics
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
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