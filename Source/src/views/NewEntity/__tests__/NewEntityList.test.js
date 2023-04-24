const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import NewEntityList from '../NewEntityList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render NewEntity rows when api response has data', async () => {
    const endPoint = 'newEntity'
    const getNewEntityListResponse = [
        {
            id: 1,
            Noman: 'Noman',
            IDErp: 81,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getNewEntityListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <NewEntityList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const newEntityNomanCell = await screen.findByText(/Noman/i)

    expect(newEntityNomanCell).toHaveTextContent(/Noman/i)
    mock.reset()
})
