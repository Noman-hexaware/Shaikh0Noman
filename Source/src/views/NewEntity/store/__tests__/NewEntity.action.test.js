import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchNewEntity,
    addNewEntity,
    editNewEntity,
    deleteNewEntity,
} from '../newEntity.action'

const getNewEntityListResponse = [
    {
        id: 1,
        Noman: 'Noman',
        IDErp: 54,
    },
]

const addNewEntityListResponse = (data) => {
    return { id: 2, ...data }
}
const editNewEntityListResponse = (data) => {
    return data
}

describe('should test NewEntity redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'newEntity'
    test('Should be able to fetch the newEntity list and update newEntity redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getNewEntityListResponse)
        const result = await store.dispatch(fetchNewEntity())
        const newEntityList = result.payload
        expect(result.type).toBe('newEntity/fetchNewEntity/fulfilled')
        expect(newEntityList).toEqual(getNewEntityListResponse)

        const state = store.getState().newEntity
        expect(state.entities).toEqual(newEntityList)
    })

    test('Should be able to add new newEntity to list and make post api and update newEntity redux store', async () => {
        const body = {
            Noman: 'Noman',
            IDErp: 43,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addNewEntityListResponse(body)
        )
        const result = await store.dispatch(addNewEntity(body))
        const newEntityItem = result.payload
        expect(result.type).toBe('newEntity/addNewEntity/fulfilled')
        expect(newEntityItem).toEqual(addNewEntityListResponse(body))

        const state = store.getState().newEntity
        expect(state.entities).toContainEqual(addNewEntityListResponse(body))
    })

    test('Should be able to edit newEntity in list and make put api call and update newEntity redux store', async () => {
        const body = {
            id: 1,
            Noman: 'Noman',
            IDErp: 73,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editNewEntityListResponse(body)
        )
        const result = await store.dispatch(editNewEntity(body))
        const newEntityItem = result.payload
        expect(result.type).toBe('newEntity/editNewEntity/fulfilled')
        expect(newEntityItem).toEqual(editNewEntityListResponse(body))

        const state = store.getState().newEntity
        let changedNewEntity = state.entities.find((p) => p.id === body.id)
        expect(changedNewEntity.name).toEqual(body.name)
    })

    test('Should be able to delete newEntity in list and update newEntity redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().newEntity
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteNewEntity(input))
        const deletId = result.payload
        expect(result.type).toBe('newEntity/deleteNewEntity/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().newEntity
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
