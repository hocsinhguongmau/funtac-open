import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import { connect } from 'react-redux'

const UserList = (props) => {
  const match = useRouteMatch('/users/:id')
  const user = props.users.find((user) => user.id === match.params.id)
  return user !== undefined ? (
    <div>
      <h2>{user.username}</h2>
      <p>added blogs</p>
      {user.blogs.length ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>User has no blog</p>
      )}
    </div>
  ) : (
    'No user found'
  )
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps)(UserList)
