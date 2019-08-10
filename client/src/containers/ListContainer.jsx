import { connect } from 'react-redux'
import List from '../components/List.jsx'
import listRef from '../actions/listRef.js'

const mapDispatchToProps = dispatch => {
    return {
        getListRef: ref => dispatch(listRef(ref))
    }
}

const mapStateToProps = state => {
    return {
        shoutOuts: state.shoutOutsToRender
    }
}

var ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

export default ListContainer
