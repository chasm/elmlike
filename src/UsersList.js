import Inferno from 'inferno'
import S from 'sanctuary'
import Action from './Action'

export default (signal, { error, users, }) =>
<div>
  <h3>Users List</h3>
  <div>
    {error
      ? <span>Error. Not Found.</span>
      : users
        ? <table>{
          S.map(({ id, firstName, lastName, }) =>
            <tr key={id}>
              <td>
                <button onClick={signal(Action.ShowUser(id))}>Edit</button>
              </td>
              <td>{firstName} {lastName}</td>
            </tr>,
            users
          )
        }</table>
      : <p>Loading.</p>
    }
  </div>
</div>
