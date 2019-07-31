//Page Object
import { request } from '../../request/index'
Page({
  data: {
    // 左侧的菜单数组
    leftMenuList: [],
    // 右侧 商品内容数组
    rightGoodsList: [],
    // 选中的菜单
    currentIndex: 0,
    // 页面一开始的滚动高度
    scrollTop: 0
  },
  // 接口返回值
  Cats: [],
  handelTap(e) {
    // console.log(e.currentTarget.dataset.index);
    const { index } = e.currentTarget.dataset
    let rightGoodsList = this.Cats[index].children
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    })
    // console.log(this.data.currentIndex);
  },
  // 获取分类数据
  getCategoryList() {
    request({ url: '/categories' })
      .then(result => {
        // console.log(result);
        /* let leftMenuList = result.map((v, i) => {
          return {
            cat_name: v.cat_name,
            cat_id: v.cat_id
          }
        }) */
        this.Cats = result
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cats });
        let leftMenuList = this.Cats.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }))
        let rightGoodsList = this.Cats[0].children
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      })
  },
  //options(Object)
  onLoad: function (options) {
    let cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getCategoryList()
    } else {
      if (Date.now() - cates.time >= 10000) {
        this.getCategoryList()
      } else {
        this.Cats = cates.data
        let leftMenuList = this.Cats.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }))
        let rightGoodsList = this.Cats[0].children
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
