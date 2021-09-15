import PropTypes from 'prop-types'

const Notification = ({ message, error }) => {
	if (message === null) {
		return null
	}

	return <div className={`message ${error ? 'error' : ''}`}>{message}</div>
}

Notification.propTypes = {
	message: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
}
export default Notification
