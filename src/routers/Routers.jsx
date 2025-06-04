// src/routers/Routers.jsx
import { Navigate, useRoutes } from 'react-router-dom';
import * as Pages from '@/pages';
import ThemeLayoutsSideBar from '@/layouts/ThemeLayoutsSideBar';
import { PATHS } from './path';
import NotFound from '@/pages/NotFound';

function AppRoutes() {

    return useRoutes([
        { path: PATHS.home, element: <Pages.Home /> },
        { path: PATHS.login, element: <Pages.Login /> },
        { path: PATHS.signup, element: <Pages.SignUp /> },
        { path: PATHS.resetPassword, element: <Pages.ResetPassword /> },
        { path: PATHS.resetPasswordForm, element: <Pages.ResetPasswordForm /> },
        {
            path: '/',
            element: <ThemeLayoutsSideBar />,
            children: [
                { path: PATHS.dashboard, element: <Pages.Dashboard /> },
                { path: PATHS.task, element: <Pages.Task /> },
                { path: PATHS.calendar, element: <Pages.Calendar /> },
                { path: PATHS.profile, element: <Pages.Profile /> },
            ],
        },

        // Các route khác
        { path: '/not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
    ]);
}

function Routers() {
    return <AppRoutes />;
}

export default Routers;