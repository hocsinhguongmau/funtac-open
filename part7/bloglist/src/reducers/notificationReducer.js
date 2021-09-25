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

let timer
export const setNotification = (message, time) => {
  clearTimeout(timer)
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'DEL_NOTIFICATION',
      })
    }, time * 1000)
  }
}
export const delNotification = () => ({
  type: 'DEL_NOTIFICATION',
})

export default notificationReducer
