export default {
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: '概况',
    icon: 'dashboard'
  },
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard')
}
