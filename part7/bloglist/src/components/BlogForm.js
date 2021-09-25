import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const newLikes = useField('text')
  const getId = () => (100000 * Math.random()).toFixed(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: newLikes.value ? newLikes.value : 0,
      id: getId(),
    }
    props.addBlog(newBlog)
    newTitle.onReset()
    newAuthor.onReset()
    newUrl.onReset()
    newLikes.onReset()
    const message = `You created '${newTitle.value}'`
    props.setNotification(message, 5)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new blog</h2>
      <div>
        Title: <input {...newTitle} />
      </div>
      <div>
        Author: <input {...newAuthor} />
      </div>
      <div>
        Link: <input {...newUrl} />
      </div>
      <div>
        Likes: <input {...newLikes} />
      </div>
      <div>
        <button id='submit-form' type='submit'>
          Add
        </button>
      </div>
    </form>
  )
}
const mapDispatchToProps = {
  addBlog,
  setNotification,
}

export default connect(null, mapDispatchToProps)(BlogForm)
