import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'NewEntity'

export const fetchNewEntity = createAsyncThunk(
    'NewEntity/fetchNewEntity',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const NewEntity = await response.data
        return NewEntity
    }
)

export const addNewEntity = createAsyncThunk(
    'NewEntity/addNewEntity',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const NewEntity = await response.data
        thunkAPI.dispatch(showSuccess('NewEntity added successfully'))
        return NewEntity
    }
)

export const editNewEntity = createAsyncThunk(
    'NewEntity/editNewEntity',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const NewEntity = await response.data
        thunkAPI.dispatch(showSuccess('NewEntity updated successfully'))
        return NewEntity
    }
)

export const deleteNewEntity = createAsyncThunk(
    'NewEntity/deleteNewEntity',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected NewEntity deleted successfully.')
            )
            return data.id
        }
    }
)
