
import RouteView from '@/layouts/RouteView'

export default {
  path: '/system',
  component: RouteView,
  redirect: '/system/index',
  meta: { title: '系统管理' },
  children: [
    {
      path: '/system/index',
      name: 'system',
      component: () => import('@/views/system/index'),
      meta: { title: '系统' }
    }
  ]

}
