import NotFound from 'views/sessions/NotFound'
import NewEntityRoutes from 'views/NewEntity/NewEntityRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [...homeRoutes, ...NewEntityRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
