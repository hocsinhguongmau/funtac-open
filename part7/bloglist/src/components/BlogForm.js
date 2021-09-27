import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/useField'
import { useHistory } from 'react-router'
import { addBlog, initBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const newLikes = useField('text')
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: newLikes.value ? newLikes.value : 0,
    }
    await props.addBlog(newBlog)
    props.initBlogs()
    newTitle.onReset()
    newAuthor.onReset()
    newUrl.onReset()
    newLikes.onReset()
    const message = `You created '${newTitle.value}'`
    props.setNotification(message, 5)
    history.push('/')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new blog</h2>
      <div>
        Title: <input className='border-2 border-gray-500' {...newTitle} />
      </div>
      <div>
        Author: <input className='border-2 border-gray-500' {...newAuthor} />
      </div>
      <div>
        Link: <input className='border-2 border-gray-500' {...newUrl} />
      </div>
      <div>
        Likes: <input className='border-2 border-gray-500' {...newLikes} />
      </div>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          id='submit-form'
          type='submit'>
          Add
        </button>
      </div>
    </form>
  )
}
const mapDispatchToProps = {
  addBlog,
  setNotification,
  initBlogs,
}

export default connect(null, mapDispatchToProps)(BlogForm)
