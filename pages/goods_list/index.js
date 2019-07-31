// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    // 页面要渲染的商品数组
    goodsList: []
  },
  // 全局 接口参数 
  QueryParams: {
    // 关键字 可以为空字符串
    query: "",
    // 分类id 
    cid: "",
    // 页码 
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
  // 总页数
  TotalPages: 1,

  // 切换tabs
  handelChange(e) {
    // console.log(e.detail.index);
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({ tabs })
  },

  // 获取商品列表数据
  async getGoodsList() {
    /* request({ url: '/goods/search', data: this.QueryParams })
      .then(res => {
        // console.log(res);
        this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize)
        this.setData({ goodsList: [...this.data.goodsList, ...res.goods] })
        wx.stopPullDownRefresh()
      }) */

    const res = await request({ url: '/goods/search', data: this.QueryParams })
    this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize)
    this.setData({ goodsList: [...this.data.goodsList, ...res.goods] })
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.QueryParams.pagenum = 1
    this.setData({ goodsList: [] })
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.TotalPages) {
      // console.log('no');
      wx.showToast({
        title: '没有数据了',
        icon: 'none'
      })
    } else {
      // console.log('good');
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})