import { useState } from 'react'
import './agenda.css'

const START_HOUR = 6   
const END_HOUR = 23     
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)

function formatHourLabel(hour) {
  const period = hour < 12 || hour === 24 ? 'AM' : 'PM'
  let displayHour = hour % 12
  if (displayHour === 0) displayHour = 12
  return `${displayHour} ${period}`
}

// Convert the time into hours
function getHourFromISO(isoString) {
  const date = new Date(isoString)
  return date.getHours() + date.getMinutes() / 60
}

//Formats the time for display
function formatTimeDisplay(isoString) {
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function AgendaPage({ onBack, schedule, user }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const dayStart = START_HOUR
  const totalHours = END_HOUR - START_HOUR + 1

  console.log('AgendaPage received schedule:', schedule)

  const hasSchedule = schedule && Array.isArray(schedule) && schedule.length > 0

  const events = hasSchedule 
    ? schedule.map((item, index) => {
        const startHour = getHourFromISO(item.startTime)
        const endHour = getHourFromISO(item.endTime)
        
        // Determine event type based on title
        let type = 'focus'
        const titleLower = item.title.toLowerCase()
        if (titleLower.includes('break') || titleLower.includes('rest') || titleLower.includes('lunch')) {
          type = 'break'
        } else if (titleLower.includes('meeting') || titleLower.includes('call') || titleLower.includes('appointment')) {
          type = 'meeting'
        } else if (titleLower.includes('exercise') || titleLower.includes('gym') || titleLower.includes('walk')) {
          type = 'break'
        }
        
        return {
          id: index + 1,
          title: item.title,
          start: startHour,
          end: endHour,
          type: type,
          healthTip: item.healthTip || null,
          startTime: item.startTime,
          endTime: item.endTime,
          startDisplay: formatTimeDisplay(item.startTime),
          endDisplay: formatTimeDisplay(item.endTime)
        }
      })
    : []

  console.log('Processed events:', events)

  // Show message if no schedule
  if (!hasSchedule) {
    return (
      <div className="agenda-page">
        <header className="agenda-header">
          <button onClick={onBack} className="agenda-back">
            ← Back
          </button>
          <div className="agenda-title-block">
            <h1>Your day</h1>
            <p className="agenda-subtitle">No schedule yet. Create a plan first!</p>
          </div>
        </header>
        <div className="empty-state">
          <p>Go back to the Plan page and create your schedule</p>
        </div>
      </div>
    )
  }

  return (
    <div className="agenda-page">
      <header className="agenda-header">
        <button onClick={onBack} className="agenda-back">
          ← Back
        </button>
        <div className="agenda-title-block">
          <h1>Your day</h1>
          {user && user.name && <p className="agenda-subtitle">Welcome, {user.name}!</p>}
          <p className="agenda-subtitle">{events.length} tasks planned for today</p>
        </div>
      </header>

      <div className="agenda-grid-wrapper">
        <div
          className="agenda-grid"
          style={{ '--total-hours': totalHours }}
        >
          <div className="time-column">
            {HOURS.map((hour) => (
              <div key={hour} className="time-slot">
                <span className="time-label">{formatHourLabel(hour)}</span>
              </div>
            ))}
          </div>

          <div className="events-column">
            {HOURS.map((hour) => (
              <div key={hour} className="hour-row" />
            ))}

            {events
              .filter((evt) => evt.start >= dayStart && evt.start <= END_HOUR + 1)
              .map((evt) => {
                const top = (evt.start - dayStart) * 60
                const height = Math.max((evt.end - evt.start) * 60, 28)
                return (
                  <button
                    key={evt.id}
                    className={`agenda-event event-${evt.type}`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                    onClick={() => setSelectedEvent(evt)}
                  >
                    <span className="event-title">{evt.title}</span>
                    <span className="event-time">
                      {evt.startDisplay} – {evt.endDisplay}
                    </span>
                  </button>
                )
              })}
          </div>
        </div>
      </div>


      {selectedEvent && (
        <div className="event-detail-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="event-detail-card" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedEvent.title}</h3>
            <p className="event-detail-time">
              {selectedEvent.startDisplay} – {selectedEvent.endDisplay}
            </p>
            {selectedEvent.healthTip && (
              <div className="event-tip-container">
                <p className="event-tip"> {selectedEvent.healthTip}</p>
              </div>
            )}
            <button onClick={() => setSelectedEvent(null)} className="event-detail-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgendaPage