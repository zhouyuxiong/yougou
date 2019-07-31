//Page Object
import { request } from '../../request/index'

Page({
  data: {
    // 1 轮播图数组
    swiperList: [],
    // 2 分类导航数组
    navCateList: [],
    // 3 楼层数组
    floorList: []
  },
  // 获取轮播图数据
  getSwiperList() {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result.data);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });

    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })

  },
  // 获取分类导航数组
  getNavCateList() {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
    //   success: (result) => {
    //     // console.log(result.data);
    //     this.setData({
    //       navCateList: result.data.message
    //     })
    //   }
    // });

    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          navCateList: result
        })
      })
  },
  // 获取楼层数组
  getFloorList() {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
    //   success: (result) => {
    //     // console.log(result.data);
    //     this.setData({
    //       floorList: result.data.message
    //     })
    //   }
    // });

    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavCateList()
    this.getFloorList()
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
