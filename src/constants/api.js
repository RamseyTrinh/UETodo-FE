export const AUTH_API = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESEND_CONFIRMATION: '/auth/resend-confirmation',
    CONFIRM_REGISTRATION: '/auth/confirm-registration',
}

export const USER_API = {
    GET_CURRENT_USER: '/user/me'
}

export const TASK_API = {
    GET_TASKS: '/task',
    GET_TASK: (taskId) => `/task/${taskId}`,
    CREATE_TASK: '/task',
    UPDATE_TASK: (taskId) => `/task/${taskId}`,
    DELETE_TASK: (taskId) => `/task/${taskId}`,
    GET_TASKS_BY_USER: (userId, page, per_page) => `/task/user/${userId}?page=${page}&per_page=${per_page}`,
    GET_DASHBOARD_TASKS: (userId) => `/task/dashboard/${userId}`,
    GET_BAR_CHART_DATA: (userId) => `/task/dashboard/barchart/${userId}`,
    GET_LINE_CHART_DATA: (userId) => `/task/dashboard/linechart/${userId}`,
    GET_OVERVIEW_TASKS: (userId) => `/task/dashboard/overview/${userId}`,
}
