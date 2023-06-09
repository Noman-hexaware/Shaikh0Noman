import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editNewEntity, fetchNewEntity } from './store/NewEntity.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

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

const EditNewEntity = () => {
    const { id: NewEntityId } = useParams()

    const NewEntity = useSelector((state) =>
        state.NewEntity.entities.find(
            (NewEntity) => NewEntity.id.toString() === NewEntityId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Noman, setNoman] = useState(NewEntity.Noman)

    const [IDErp, setIDErp] = useState(NewEntity.IDErp)

    const handleNoman = (e) => setNoman(e.target.value)
    const handleIDErp = (e) => setIDErp(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editNewEntity({
                id: NewEntityId,
                noman,
                iDErp,
            })
        ).then(() => {
            dispatch(fetchNewEntity())
        })
        navigate('/NewEntity')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditNewEntity', path: '/NewEntity' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="Noman"
                                id="nomanInput"
                                onChange={handleNoman}
                                value={noman}
                                validators={['required']}
                                label="Noman"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="IDErp"
                                id="iDErpInput"
                                onChange={handleIDErp}
                                value={iDErp || ''}
                                validators={['required']}
                                label="IDErp"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditNewEntity
