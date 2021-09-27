import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'
import { login } from '../reducers/loginReducer'
const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')
  const handleSubmit = (e) => {
    e.preventDefault()
    props.login({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input className='border-2 border-gray-500' {...username} />
        </div>
        <div>
          password
          <input className='border-2 border-gray-500' {...password} />
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='submit'
          id='user-login'>
          login
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(LoginForm)
