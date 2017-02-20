import myro from 'myro'

const USERS_LIST_ROUTE = 'USERS_LIST_ROUTE'
const USERS_EDIT_ROUTE = 'USERS_EDIT_ROUTE'

const route = myro({
  '/users': {
    name: 'users',
    props: USERS_LIST_ROUTE,
    routes: {
      '/:id': {
        name: 'detail',
        props: USERS_EDIT_ROUTE,
      },
    },
  },
  '': {
    name: 'home',
    props: USERS_LIST_ROUTE, // simply show UsersList
  },
})

export default route
export {
  USERS_EDIT_ROUTE,
  USERS_LIST_ROUTE,
}
