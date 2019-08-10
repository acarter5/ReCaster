import { connect } from 'react-redux'
import Form from '../components/Form.jsx'
import { makeHandleFlip } from './lib/index.js'

const mapDispatchToProps = dispatch => {
    return {
        handleFlip: makeHandleFlip(dispatch)
    }
}

const mapStateToProps = state => {
    return {
        currentTime: state.currentTime,
        isFlipped: state.isFlipped,
        listRef: state.listRef
    }
}

var FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)

export default FormContainer
