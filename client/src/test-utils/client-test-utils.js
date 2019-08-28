import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { render, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
const flushPromises = () => new Promise(setImmediate)

function renderWithProvider(ui, { ...renderOptions } = {}) {
    const utils = render(<Provider store={store}>{ui}</Provider>, renderOptions)
    const finishLoading = async () => await flushPromises()
    return {
        ...utils,
        finishLoading,
        history
    }
}

export {
    Simulate,
    wait,
    render,
    cleanup,
    fireEvent
} from '@testing-library/react'
export { renderWithProvider }
