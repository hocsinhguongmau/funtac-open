const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'DEL_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message) => ({
  type: 'SET_NOTIFICATION',
  data: message,
})
export const delNotification = () => ({
  type: 'DEL_NOTIFICATION',
})

export default notificationReducer
