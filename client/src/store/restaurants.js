import axios from 'axios'

// ACTIONS
const GOT_RESTAURANTS = 'GOT_RESTAURANTS'
const REMOVED_RESTAURANT = 'REMOVE_RESTAURANT'
const ADDED_RESTAURANT = 'ADDED_RESTAURANT'

//ACTION CREATORS
const gotRestaurants = restaurants => ({ type: GOT_RESTAURANTS, restaurants })

const removedRestaurant = id => ({
  type: REMOVED_RESTAURANT,
  id
})

export const addFavourite = restaurant => ({
  type: ADDED_RESTAURANT,
  restaurant
})

// THUNKS
export const getFavourites = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/user/${userId}`)
    dispatch(gotRestaurants(data.restaurants))
  } catch (err) {
    console.error(err)
  }
}

export const removeFavourite = (restaurantId, userId) => async dispatch => {
  try {
    await axios.delete('/api/like', { data: { restaurantId, userId } })
    dispatch(removedRestaurant(restaurantId))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const intialState = []

// REDUCER
export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_RESTAURANTS:
      return action.restaurants
    case REMOVED_RESTAURANT: {
      const cp = [...state]
      const filtered = cp.filter(el => {
        return action.id !== el.id
      })
      return filtered
    }
    case ADDED_RESTAURANT:
      return [...state, action.restaurant]
    default:
      return state
  }
}
