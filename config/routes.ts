export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '注册', path: '/user/register', component: './User/Register' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/lottery', name: '商品抽奖', icon: 'smile', component: './Lottery' },
  { path: '/buy', name: '商品抢购', icon: 'smile', component: './Buy' },
  {
    path: '/me',
    name: '我的',
    icon: 'smile',
    routes: [
      { path: '/me', redirect: '/me/order' },
      { path: '/me/order', name: '我的订单',component: './Me/Order' },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/activity' },
      { path: '/admin/activity', name: '活动管理', component: './Admin/Activity' },
      { path: '/admin/good', name: '抽奖商品管理', component: './Admin/MallGood' },
      { path: '/admin/sell', name: '售卖商品管理', component: './Admin/SellGood' },
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
