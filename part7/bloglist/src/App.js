import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import UserList from './components/UserList'
import Menu from './components/Menu'
import { checkUser, logout } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'

import BlogItem from './components/BlogItem'
import User from './components/User'

const App = (props) => {
  useEffect(() => {
    props.checkUser()
    props.initBlogs()
    props.initUsers()
  }, [])
  const handleLogout = () => {
    props.logout()
  }

  return (
    <div>
      {props.login ? (
        <>
          <Notification />
          <Menu />
          <p className='my-5'>
            Welcome <span className='text-red-800'>{props.login.name}</span>
          </p>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleLogout}>
            Logout
          </button>
          <Switch>
            <Route exact path='/users'>
              <UserList />
            </Route>
            <Route exact path='/'>
              <Filter />
              <BlogList />
            </Route>
            <Route exact path='/create'>
              <BlogForm />
            </Route>
            <Route exact path='/blogs/:id'>
              <BlogItem />
            </Route>
            <Route exact path='/users/:id'>
              <User />
            </Route>
          </Switch>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return { login: state.login }
}
const mapDispatchToProps = {
  checkUser,
  logout,
  initBlogs,
  initUsers,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
