import Inferno from 'inferno'
import Action from './Action'

export default (signal, { error, user, }) =>
<div>
  <h3>Users Detail</h3>
  <div>
    {error
      ? <span>Error. Not Found.</span>
      : user
        ? <div key={user.id}>
          <p>{user.firstName} {user.lastName}</p>
          <p>
            <button onClick={signal(Action.UpdateUser(user))}>Save</button>
            {' '}
            <button onClick={signal(Action.ShowUsers)}>List</button>
          </p>
        </div>
        : <p>Loading.</p>
    }
  </div>
</div>
