
const tokens = {
  admin: {
    token: 'admin-token'
  }
}

const users = {
  'admin-token': {
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menus: [
      {
        'menuName': '系统管理',
        'uri': '/system',
        'parentId': 0,
        'subMenus': [
          {
            'menuName': '系统',
            'uri': '/system/index',
            'parentId': 1,
            'id': 2
          },
          {
            'menuName': '系统2',
            'uri': '/system/index2',
            'parentId': 1,
            'id': 2
          }
        ],
        'id': 1
      }
      // {
      //   'menuName': '概况',
      //   'uri': '/dashboard',
      //   'parentId': 0,
      //   'id': 3
      // }
    ]
  }
}

export default [
  // user login
  {
    url: '/manage/employee/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/manage/employee/userInfo',
    type: 'post',
    response: config => {
      const { employeeToken } = config.body
      const info = users[employeeToken]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
