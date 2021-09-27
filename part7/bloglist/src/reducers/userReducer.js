import * as userServices from '../service/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    default:
      return state
  }
}
export const initUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll()
    dispatch({
      type: 'INIT_USER',
      data: users,
    })
  }
}

export default userReducer
