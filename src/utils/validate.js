/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isEl(path) {
  return path.includes('el-')
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  console.log(str.trim())
  // const valid_map = ['admin', 'editor']
  return str.trim()
}
