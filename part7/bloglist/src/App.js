import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initUser } from './reducers/loginReducer'
import { logout } from './reducers/loginReducer'

const App = (props) => {
  useEffect(() => {
    props.initUser()
  }, [])
  const handleLogout = () => {
    props.logout()
  }
  return (
    <div>
      {props.user ? (
        <>
          <p>Welcome {props.user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <Notification />
          <Filter />
          <BlogForm />
          <BlogList />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return { user: state.login }
}
const mapDispatchToProps = {
  initUser,
  logout,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
