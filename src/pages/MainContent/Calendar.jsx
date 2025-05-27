import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AskTask from '../../components/AskTask'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'


const Calendar = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [events, setEvents] = useState([])

    const theme = useTheme()

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr)
        setModalOpen(true)
    }

    const handleCreateTask = (newEvent) => {
        setEvents([...events, newEvent])
    }

    return (
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    minHeight: '100vh',
                    padding: 1
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    events={events}
                    height="auto"
                    contentHeight="auto"
                    aspectRatio={1.5}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay',
                    }}
                    dayMaxEvents={3}
                    fixedWeekCount={false}
                    dayCellClassNames={({ date }) => {
                        const classes = ['fc-daycell']
                        const day = date.getDay()

                        if (day === 0) classes.push('fc-sunday')
                        if (day === 6) classes.push('fc-saturday')

                        return classes
                    }}
                    dayCellContent={({ date }) => {
                        const isToday =
                            date.toDateString() === new Date().toDateString()
                        const day = date.getDay()

                        return (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    paddingRight: 4,
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        padding: isToday ? '2px 6px' : 0,
                                        borderRadius: isToday ? '50%' : 0,
                                        backgroundColor: isToday
                                            ? theme.palette.success.dark
                                            : 'transparent',
                                        color: isToday
                                            ? theme.palette.success.contrastText
                                            : day === 0
                                              ? theme.palette.error.main
                                              : day === 6
                                                ? theme.palette.success.main
                                                : theme.palette.text.primary,
                                    }}
                                >
                                    {date.getDate()}
                                </span>
                            </div>
                        )
                    }}
                    eventContent={({ event }) => {
                        const title = event.title
                        const isOverdue = title.includes('[Overdue]')

                        return (
                            <div
                                style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    backgroundColor: isOverdue
                                        ? 'transparent'
                                        : theme.palette.primary.dark,
                                    color: isOverdue
                                        ? theme.palette.error.main
                                        : theme.palette.primary.contrastText,
                                    borderRadius: 6,
                                    padding: '2px 6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}
                            >
                                {isOverdue && (
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor:
                                                theme.palette.error.main,
                                            display: 'inline-block',
                                        }}
                                    />
                                )}
                                <span>{title}</span>
                            </div>
                        )
                    }}
                    eventClassNames={() => ['event-custom']}
                />

                <AskTask
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    selectedDate={selectedDate}
                    onCreate={handleCreateTask}
                />

                <style>
                    {`
                    /* General Calendar Styling */
                    .fc {
                        font-family: ${theme.typography.fontFamily};
                        color: ${theme.palette.text.primary};
                    }

                    /* Header Toolbar */
                    .fc .fc-toolbar {
                        background-color: ${theme.palette.background.paper};
                        border-radius: ${theme.shape.borderRadius}px;
                        padding: ${theme.spacing(1.5)};
                        margin-bottom: ${theme.spacing(2)};
                    }

                    .fc .fc-button {
                        background-color: ${theme.palette.background.paper};
                        color: ${theme.palette.text.primary};
                        border: 1px solid ${theme.palette.divider};
                        box-shadow: none; /* Remove default button shadow */
                        text-transform: none; /* Keep text as is */
                    }

                    .fc .fc-button:hover {
                        background-color: ${theme.palette.action.hover};
                        border-color: ${theme.palette.action.hover};
                    }

                    .fc .fc-button.fc-button-active {
                        background-color: ${theme.palette.primary.main}; /* Use primary for active */
                        color: ${theme.palette.primary.contrastText};
                        border-color: ${theme.palette.primary.main};
                    }

                    .fc .fc-toolbar-title {
                        color: ${theme.palette.text.primary};
                    }

                    /* Calendar Body (Table) */
                    .fc-theme-standard .fc-scrollgrid {
                        border-color: ${theme.palette.divider};
                    }

                    .fc-theme-standard td,
                    .fc-theme-standard th {
                        border-color: ${theme.palette.divider};
                    }

                    /* Day Headers (Sun, Mon, Tue...) */
                    .fc-col-header-cell {
                        background-color: ${theme.palette.background.paper};
                        color: ${theme.palette.text.secondary};
                    }

                    /* Day Cells */
                    .fc-daygrid-day {
                        background-color: ${theme.palette.background.default};
                    }

                    .fc-daygrid-day.fc-day-today {
                        background-color: transparent !important; /* Keep your existing logic for today's background */
                    }

                    .fc-daygrid-day.fc-day-other .fc-daygrid-day-number {
                        color: ${theme.palette.text.disabled}; /* Dim numbers for days outside the current month */
                    }

                    /* Weekend Colors for Day Numbers (Existing from your code) */
                    .fc-sunday .fc-daygrid-day-number {
                        color: ${theme.palette.error.main} !important;
                    }

                    .fc-saturday .fc-daygrid-day-number {
                        color: ${theme.palette.success.main} !important;
                    }

                    /* Event Styling */
                    .event-custom {
                        padding: 0 !important;
                        background-color: transparent !important;
                        border: none !important;
                        cursor: pointer; /* Indicate clickability for events */
                    }

                    .fc-event-title {
                        font-weight: 500; /* Match your eventContent style */
                    }

                    /* Event Dot for overdue */
                    .event-custom .overdue-dot { /* Added a class for the dot for potential future CSS control */
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background-color: ${theme.palette.error.main};
                        display: inline-block;
                    }

                    /* Hover states for cells (optional but good for UX) */
                    .fc-daygrid-day:hover {
                        background-color: ${theme.palette.action.hover};
                        cursor: pointer;
                    }
                    .fc .fc-col-header-cell-cushion {
                        color: ${theme.palette.text.primary} !important;
                    }
                `}
                </style>
            </Box>
    )
}

export default Calendar
