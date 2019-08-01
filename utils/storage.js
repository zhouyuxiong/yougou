/**
 * 获取商品分类数据
 */
export const getStorageSync = () => {
  return wx.getStorageSync("cates");
}

/**
 * 把商品分类数据存入本地存储
 * @param {Object} obj 
 */
export const setStorageSync = (obj) => {
  wx.setStorageSync('cates', obj);
}
