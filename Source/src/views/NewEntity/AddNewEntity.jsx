import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewEntity, fetchNewEntity } from './store/NewEntity.action'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AddNewEntity = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [noman, setNoman] = useState('')
    const [iDErp, setIDErp] = useState('')

    const handleNoman = (e) => setNoman(e.target.value)
    const handleIDErp = (e) => setIDErp(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addNewEntity({
                noman,
                iDErp,
            })
        ).then(() => {
            dispatch(fetchNewEntity())
        })
        navigate('/NewEntity')
    }

    useEffect(() => {
        return () => {
            setNoman('')
            setIDErp('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddNewEntity', path: '/NewEntity' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="Noman"
                                id="nomanInput"
                                onChange={handleNoman}
                                value={noman}
                                label="Noman"
                            />

                            <TextField
                                type="number"
                                name="IDErp"
                                id="iDErpInput"
                                onChange={handleIDErp}
                                value={iDErp || ''}
                                label="IDErp"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddNewEntity
