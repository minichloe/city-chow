import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import favourites from './restaurants'
import restaurants from './nearby'
import location from './location'
import loading from './loading'
import filter from './filter'

const reducer = combineReducers({
  user,
  restaurants,
  favourites,
  location,
  filter,
  loading
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
