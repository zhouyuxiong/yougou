//Page Object
import { setStorageUserInfo } from '../../utils/storage'
Page({
  data: {

  },
  handleGetUserInfo(e) {
    // console.log(e.detail.userInfo);
    setStorageUserInfo(e.detail.userInfo)

    wx.navigateBack({
      delta: 1
    });

  },
  //options(Object)
  onLoad: function (options) {

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
