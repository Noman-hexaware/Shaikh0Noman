const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddNewEntity from '../AddNewEntity'

beforeEach(() => {
    const endPoint = 'NewEntity'
    const getStudentListResponse = [
        {
            id: 1,
            Noman: 'Noman',
            IDErp: 41,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddNewEntity />
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

describe('testing view NewEntityAdd Component', () => {
    test('should render AddNewEntity and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addNewEntityButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const NomanElement = screen.getByLabelText(/Noman/i)
        const IDErpElement = screen.getByLabelText(/IDErp/i)

        expect(addNewEntityButtonElement).toBeInTheDocument()

        expect(NomanElement).toBeInTheDocument()
        expect(IDErpElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of NewEntity add form', async () => {
        const NomanElement = screen.getByLabelText(/Noman/i)
        const IDErpElement = screen.getByLabelText(/IDErp/i)

        fireEvent.change(NomanElement, { target: { value: 'Noman' } })
        fireEvent.change(IDErpElement, { target: { value: 40 } })
    })

    test('should return error message when add NewEntity button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addNewEntityButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addNewEntityButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
