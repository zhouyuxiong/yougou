//Page Object
import { getStorageUserInfo } from '../../utils/storage'
Page({
  data: {
    userInfo: {}
  },
  //options(Object)
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    const userInfo = getStorageUserInfo()
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return
    }

    this.setData({ userInfo })
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
