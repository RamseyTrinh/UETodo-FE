import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import { Home, Login, Payment, Shop, SignUp } from '@/pages'
import { PATHS } from './path'
import NotFound from '@/pages/NotFound'

function AppRoutes() {
    return useRoutes([
        { path: PATHS.home, element: <Home /> },
        { path: '/payment', element: <Payment /> },
        { path: '/shop', element: <Shop /> },
        { path: PATHS.login, element: <Login /> },
        { path: PATHS.signup, element: <SignUp /> },
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
    ])
}

function Routers() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}

export default Routers
