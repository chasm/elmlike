import Inferno from 'inferno'
import {
  forEach,
} from 'ramda'
import {
  create,
  env,
} from 'sanctuary'
import $ from 'sanctuary-def'

import Navigation from './Navigation'
import routes from './routes'
import Users from './UsersMain'

// HtmlElement :: Type
const HtmlElement = $.NullaryType(
  'elmlike/HtmlElement',
  '',
  x => /^\[object HTML.*Element\]$/.test(Object.prototype.toString.call(x))
)

const S = create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: env.concat([ HtmlElement, ]),
})

const {
  init,
  update,
  view,
} = Users
const renderer = S.curry2((node, component) => Inferno.render(component, node))
const render = renderer(document.getElementById('app'))

const runEffects = (signal, effects) => forEach(
  e => e().fork(console.error, a => signal(a)()),
  effects
)

const StartApp = (render, [ state, effects, ], view, update) => {
  const signal = S.curry2((state, action) =>
    () => main(update(action, state), view))

  const main = ([ state, effects, ], view) => {
    render(view(signal(state), state))
    runEffects(signal(state), effects)
  }

  main([ state, effects, ], view)
}

StartApp(
  render,
  init({ users: [], route: routes(Navigation.getLocation()), }),
  view,
  update
)
