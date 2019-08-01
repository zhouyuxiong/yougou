/**
 * 获取用户的当前设置 wx.getSetting
 */
export const getSetting = () => {
  return new Promise((reslove, reject) => {
    wx.getSetting({
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 获取用户收货地址 wx.chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果  wx.openSetting
 */
export const openSetting = () => {
  return new Promise((reslove, reject) => {
    wx.openSetting({
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}