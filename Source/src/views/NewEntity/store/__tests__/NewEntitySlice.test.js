import store from 'store/store'
import {
    newEntityAdded,
    newEntityDeleted,
    newEntityUpdated,
} from '../newEntitySlice'

describe('testing newEntity redux store reducers', () => {
    test('add newEntity to store test', () => {
        let state = store.getState().newEntity
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            Noman: 'Noman',
            IDErp: 39,
        }
        store.dispatch(newEntityAdded(initialInput))
        state = store.getState().newEntity
        expect(state.entities).toHaveLength(1)
    })

    test('update newEntity from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            Noman: 'Noman',
            IDErp: 68,
        }
        store.dispatch(newEntityAdded(initialInput))
        let state = store.getState().newEntity
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            Noman: 'Noman',
            IDErp: 85,
        }
        store.dispatch(newEntityUpdated(updatedInput))
        state = store.getState().newEntity
        let changedNewEntity = state.entities.find((p) => p.id === 2)
        expect(changedNewEntity).toStrictEqual(updatedInput)
    })

    test('delete newEntity from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            Noman: 'Noman',
            IDErp: 25,
        }
        store.dispatch(newEntityAdded(initialInput))
        let state = store.getState().newEntity
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            newEntityDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().newEntity
        expect(state.entities).toHaveLength(2)
    })
})
