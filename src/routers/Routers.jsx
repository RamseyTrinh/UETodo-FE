import { Navigate, useRoutes } from 'react-router-dom'
import * as Pages from '@/pages'

import { PATHS } from './path'
import NotFound from '@/pages/NotFound'

function AppRoutes() {
    return useRoutes([
        { path: PATHS.home, element: <Pages.Home /> },
        { path: PATHS.login, element: <Pages.Login /> },
        { path: PATHS.signup, element: <Pages.SignUp /> },
        { path: PATHS.dashboard, element: <Pages.Dashboard /> },
        { path: PATHS.task, element: <Pages.Task /> },
        { path: PATHS.calender, element: <Pages.Calender /> },
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
    ])
}

function Routers() {
    return <AppRoutes />
}

export default Routers
