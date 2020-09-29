
import RouteView from '@/layouts/RouteView'
// import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/order',
  component: RouteView,
  redirect: '/order/index',
  meta: { title: '订单管理', permission: ['/system'] },
  children: [
    {
      path: '/order/index',
      name: 'order',
      component: () => import('@/views/system/index'),
      meta: { title: '订单1', permission: ['/system/index'] }
    },
    {
      path: '/order/index2',
      name: 'order',
      component: () => import('@/views/system/index'),
      meta: { title: '订单2', permission: ['/system/index'] }
    }
  ]
}
