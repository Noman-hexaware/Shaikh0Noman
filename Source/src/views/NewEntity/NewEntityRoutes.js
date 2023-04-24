import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const NewEntityList = Loadable(lazy(() => import('./NewEntityList')))
const EditNewEntity = Loadable(lazy(() => import('./EditNewEntity')))
const AddNewEntity = Loadable(lazy(() => import('./AddNewEntity')))

const NewEntityRoutes = [
    {
        path: '/NewEntity',
        element: <NewEntityList />,
    },
    {
        path: '/NewEntity/edit/:id',
        element: <EditNewEntity />,
    },
    {
        path: '/NewEntity/add',
        element: <AddNewEntity />,
    },
]

export default NewEntityRoutes
