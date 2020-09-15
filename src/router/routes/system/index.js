
import RouteView from '@/layouts/RouteView'
// import BasicLayout from '@/layouts/BasicLayout'

export default {
  path: '/system',
  component: RouteView,
  redirect: '/system/index',
  meta: { title: '系统管理', permission: ['/system'] },
  children: [
    {
      path: '/system/index',
      name: 'system',
      component: () => import('@/views/system/index'),
      meta: { title: '系统', permission: ['/system/index'] }
    },
    {
      path: '/system/index2',
      name: 'system',
      component: () => import('@/views/system/index'),
      meta: { title: '系统2', permission: ['/system/index'] }
    }
  ]
}
