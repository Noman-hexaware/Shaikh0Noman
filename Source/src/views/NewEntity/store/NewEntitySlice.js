import { createSlice } from '@reduxjs/toolkit'
import { fetchNewEntity } from './NewEntity.action'
import { addNewEntity } from './NewEntity.action'
import { editNewEntity } from './NewEntity.action'
import { deleteNewEntity } from './NewEntity.action'

const fetchNewEntityExtraReducer = {
    [fetchNewEntity.pending]: (state, action) => {
        state.loading = true
    },
    [fetchNewEntity.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchNewEntity.rejected]: (state, action) => {
        state.loading = false
    },
}

const addNewEntityExtraReducer = {
    [addNewEntity.pending]: (state, action) => {
        state.loading = true
    },
    [addNewEntity.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addNewEntity.rejected]: (state, action) => {
        state.loading = false
    },
}

const editNewEntityExtraReducer = {
    [editNewEntity.pending]: (state, action) => {
        state.loading = true
    },
    [editNewEntity.fulfilled]: (state, action) => {
        const { id, noman, iDErp } = action.payload
        const existingNewEntity = state.entities.find(
            (NewEntity) => NewEntity?.id?.toString() === id?.toString()
        )
        if (existingNewEntity) {
            existingNewEntity.noman = noman
            existingNewEntity.iDErp = iDErp
        }
        state.loading = false
    },
    [editNewEntity.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteNewEntityExtraReducer = {
    [deleteNewEntity.pending]: (state, action) => {
        state.loading = true
    },
    [deleteNewEntity.fulfilled]: (state, action) => {
        const id = action.payload
        const existingNewEntity = state.entities.find(
            (NewEntity) => NewEntity.id.toString() === id.toString()
        )
        if (existingNewEntity) {
            state.entities = state.entities.filter(
                (NewEntity) => NewEntity.id !== id
            )
        }
        state.loading = false
    },
    [deleteNewEntity.rejected]: (state, action) => {
        state.loading = false
    },
}
const NewEntitySlice = createSlice({
    name: 'NewEntity',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        NewEntityAdded(state, action) {
            state.entities.push(action.payload)
        },
        NewEntityUpdated(state, action) {
            const { id, noman, iDErp } = action.payload
            const existingNewEntity = state.entities.find(
                (NewEntity) => NewEntity.id.toString() === id.toString()
            )
            if (existingNewEntity) {
                existingNewEntity.noman = noman
                existingNewEntity.iDErp = iDErp
            }
        },
        NewEntityDeleted(state, action) {
            const { id } = action.payload
            const existingNewEntity = state.entities.find(
                (NewEntity) => NewEntity.id.toString() === id.toString()
            )
            if (existingNewEntity) {
                state.entities = state.entities.filter(
                    (NewEntity) => NewEntity.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchNewEntityExtraReducer,
        ...addNewEntityExtraReducer,
        ...editNewEntityExtraReducer,
        ...deleteNewEntityExtraReducer,
    },
})

export const { NewEntityAdded, NewEntityUpdated, NewEntityDeleted } =
    NewEntitySlice.actions

export default NewEntitySlice.reducer
