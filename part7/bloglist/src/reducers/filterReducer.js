const filterReducer = (state = [], action) => {
  switch (action.type) {
    case 'FILTER_BLOG':
      return action.data
    default:
      return state
  }
}
export const filterBlogs = (message) => ({
  type: 'FILTER_BLOG',
  data: message,
})

export default filterReducer
