import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AskTask from './../../components/AskTask'

const Calender = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [events, setEvents] = useState([])

    const handleDateClick = (info) => {

        setSelectedDate(info.dateStr)
        setModalOpen(true)
    }

    const handleCreateTask = (newEvent) => {
        setEvents([...events, newEvent])
    }

    return (
        <>
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
                dayMaxEvents={2}
                fixedWeekCount={false}
                dayCellClassNames={() => [
                    'hover:bg-gray-100',
                    'cursor-pointer',
                    'transition-colors',
                    'duration-200',
                ]}
                eventClassNames={() => [
                    'rounded-md',
                    'px-2',
                    'py-1',
                    'text-sm',
                    'text-white',
                    'bg-green-600',
                    'hover:bg-green-700',
                ]}
            />

            <AskTask
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedDate={selectedDate}
                onCreate={handleCreateTask}
            />
        </>
    )
}

export default Calender
