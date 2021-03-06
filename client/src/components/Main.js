import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import Routes from './Routes'
import { me } from '../store/user'
import { getLocation } from '../store/location'

class Main extends Component {
  componentDidMount() {
    this.props.checkUser()
    this.props.setCoords(this.props.coords)
  }
  render() {
    return (
      <div>
        {this.props.isLoggedIn && this.props.location.length ? (
          <Routes />
        ) : (
          <Login />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  location: state.location
})

const mapDispatchToProps = dispatch => ({
  checkUser() {
    dispatch(me())
  },
  setCoords(coords) {
    dispatch(getLocation(coords))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
