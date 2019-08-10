import { connect } from 'react-redux'
import Main from '../components/Main.jsx'

const mapStateToProps = state => {
    return {
        isFlipped: state.isFlipped
    }
}

var MainContainer = connect(mapStateToProps)(Main)

export default MainContainer
