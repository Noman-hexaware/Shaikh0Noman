const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditNewEntity from '../EditNewEntity'
import { NewEntityAdded } from '../store/NewEntitySlice'
beforeAll(() => {
    store.dispatch(
        NewEntityAdded({
            id: 1,
            Noman: 'Noman',
            IDErp: 41,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="NewEntity/edit/1" replace />
                                }
                            />
                            <Route
                                path="NewEntity/edit/:id"
                                element={<EditNewEntity />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of NewEntityEdit Component', () => {
    test('should render EditNewEntity and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveNewEntityButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const NomanElement = screen.getByLabelText(/Noman/i)
        const IDErpElement = screen.getByLabelText(/IDErp/i)

        expect(saveNewEntityButtonElement).toBeInTheDocument()

        expect(NomanElement).toBeInTheDocument()
        expect(IDErpElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of NewEntity edit form', async () => {
        const NomanElement = screen.getByLabelText(/Noman/i)
        const IDErpElement = screen.getByLabelText(/IDErp/i)

        fireEvent.change(NomanElement, { target: { value: 'Noman' } })
        fireEvent.change(IDErpElement, { target: { value: 89 } })

        expect(NomanElement.value).toBe('Noman')

        expect(IDErpElement.value).toBe(89)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const NomanElement = screen.getByLabelText(/Noman/i)
        const IDErpElement = screen.getByLabelText(/IDErp/i)

        fireEvent.change(NomanElement, { target: { value: '' } })
        fireEvent.change(IDErpElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveNewEntityButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveNewEntityButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
