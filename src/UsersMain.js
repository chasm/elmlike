import Inferno from 'inferno'
import S from 'sanctuary'
import List from './UsersList'
import Detail from './UsersDetail'
import {
  loadUsers,
} from './Action'
import {
  USERS_EDIT_ROUTE,
  USERS_LIST_ROUTE,
} from './routes'

const init = model => [
  {
    ...model,
    error: false,
  },
  [
    loadUsers,
  ],
]

const NotFound = () => <div>Not Found.</div>

const byId = id => u => S.prop('id', u) === parseInt(id)
const getUser = (id, users) => S.find(byId(id), users)

const update = (action, model) => (action(model))

const view = (signal, model) => {
  if (!model.route) return NotFound()
  return (
    <div>
      {model.route.props === USERS_EDIT_ROUTE &&
        Detail(
          signal,
          {
            user: S.fromMaybe(
              { id: 0, lastName: 'Loading... ', },
              getUser(
                S.props([ 'route', 'params', 'id', ], model),
                S.prop('users', model)
              )
            ),
          }
        )
      }
      {model.route.props === USERS_LIST_ROUTE && List(signal, model)}
    </div>
  )
}

export default {
  init,
  update,
  view,
}
