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

/**
 * 获取购物车数据
 */
export const getStorageCart = () => {
  return wx.getStorageSync('cart')
}

/**
 * 设置购物车本地存储数据
 * @param {Object} obj 
 */
export const setStorageCart = (obj) => {
  wx.setStorageSync('cart', obj);
}

/**
 * 设置token
 * @param {string} token 
 */
export const setStorageToken = (token) => {
  wx.setStorageSync('token', token);
}
