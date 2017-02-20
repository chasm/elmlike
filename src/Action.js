import S from 'sanctuary'
import Future from 'fluture'
import {
  slug,
} from 'cuid'

import Navigation from './Navigation'
import routes from './routes'

const propEq = (p, a, b) => (S.prop(p, a) === S.prop(p, b))

const editUser = user => {
  return Future.after(1000, user)
}

const getUsers = () => {
  const users = [
    {
      id: 999,
      firstName: 'Connie',
      lastName: 'Dobbs',
    },
    {
      id: 13013,
      firstName: 'J.R. "Bob"',
      lastName: 'Dobbs',
    },
  ]

  return Future.after(2000, users)
}

export const loadUsers = () => {
  return getUsers()
    .map(Action.OnLoadUsers)
}

const updateUser = user => () => {
  return editUser(user)
    .map(Action.OnUpdateUser)
}

const Action = {
  LoadUsers: model => [
    {
      ...model,
      error: false,
    },
    [
      loadUsers,
    ],
  ],
  UpdateUser: user => model => [
    {
      ...model,
      error: false,
    },
    [
      updateUser({
        ...user,
        lastName: `${user.lastName}-${slug()}`,
      }),
    ],
  ],
  OnLoadUsers: users => model => [
    {
      ...model,
      users: users || model.users,
      error: !users || !users.length,
    },
    [],
  ],
  OnUpdateUser: user => model => {
    const users = S.map(
      u => propEq('id', u, user)
        ? user
        : u,
      S.prop('users', model)
    )

    return [
      {
        ...model,
        users: users,
        error: !user,
      },
      [
        Navigation.changeLocation(Action.OnLocationChange, routes.users()),
      ],
    ]
  },
  ShowUser: id => model => [
    model,
    [
      Navigation.changeLocation(Action.OnLocationChange, routes.users.detail({ id, })),
    ],
  ],
  ShowUsers: model => [
    model,
    [
      Navigation.changeLocation(Action.OnLocationChange, routes.users()),
    ],
  ],
  OnLocationChange: location => model => [
    {
      ...model,
      route: routes(location),
    },
    [],
  ],
}

export default Action
