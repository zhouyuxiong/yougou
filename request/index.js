// 同时请求个数
import { getStorageToken } from "../utils/storage";
let requestNums = 0;

export const request = (params) => {
  wx.showLoading({
    title: "正在加载..."
  });

  requestNums++

  // let header = { ...params.header }
  let header = {}
  if (params.url.includes('/my/')) {
    const token = getStorageToken();
    header.Authorization = token
  }

  const baseUrl = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((reslove, reject) => {
    wx.request({
      ...params,
      header,
      url: baseUrl + params.url,
      success: (result) => {
        reslove(result.data.message)
      },
      fail: (error) => {
        reject(error)
      },
      complete: () => {
        requestNums--
        if (requestNums === 0) {
          wx.hideLoading();
        }
      }
    });

  })
}