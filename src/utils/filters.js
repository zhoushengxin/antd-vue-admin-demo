
import Vue from 'vue'

function getStatusValueByKey(arr, id) {
  var rst = arr.find(item => item.id === id)
  if (rst) {
    return rst.name
  } else {
    return id
  }
}

Vue.filter('getStatusValueByKey', getStatusValueByKey)

export const goodsShelfStatus = [
  {
    id: 0,
    name: '新建'
  }, {
    id: 1,
    name: '上架'
  }, {
    id: 2,
    name: '下架'
  }
]

// 商品所属商城
export const goodsBelongShopStatus = [
  {
    id: 0,
    name: '5+2'
  }, {
    id: 1,
    name: '积分商城'
  }, {
    id: 2,
    name: '奢侈品'
  }, {
    id: 3,
    name: '海量(非会员)'
  }, {
    id: 126,
    name: '全体(不包括消费商品)'
  }, {
    id: 127,
    name: '全体'
  }
]

// 评价状态
export const goodsAppraiseStatus = [
  {
    id: 0,
    name: '新建'
  }, {
    id: 1,
    name: '审核通过'
  }, {
    id: 2,
    name: '驳回'
  }
]

// 优惠券类型
export const couponType = [
  {
    id: 0,
    name: '领取'
  }, {
    id: 1,
    name: '新用户'
  }
]

// 优惠券状态
export const couponStatus = [
  {
    id: 0,
    name: '正常'
  }, {
    id: 1,
    name: '作废'
  }, {
    id: 14,
    name: '未开始'
  }, {
    id: 15,
    name: '进行中'
  }, {
    id: 16,
    name: '已失效'
  }
]

// 用户等级
export const memberLevelStatus = [
  {
    id: 0,
    name: '游客'
  }, {
    id: 1,
    name: '会员'
  }, {
    id: 2,
    name: '消费会员'
  }, {
    id: 3,
    name: 'VIP'
  }, {
    id: 4,
    name: '店代理'
  }, {
    id: 5,
    name: '实体店'
  }, {
    id: 6,
    name: '分公司'
  }, {
    id: 7,
    name: '合伙人'
  }, {
    id: 8,
    name: '高级合伙人'
  }
]

