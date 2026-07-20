import { useState } from 'react'
import './agenda.css'

const START_HOUR = 6   
const END_HOUR = 23     
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)


const SAMPLE_EVENTS = [
  { id: 1, title: 'Morning study block', start: 8, end: 9.5, type: 'focus' },
  { id: 2, title: 'Meeting with scary boss', start: 14, end: 15, type: 'meeting' },
  { id: 3, title: 'Gym / decompress', start: 17, end: 18, type: 'break' },
  { id: 4, title: 'Evening review', start: 20, end: 21, type: 'focus' },
]

function formatHourLabel(hour) {
  const period = hour < 12 || hour === 24 ? 'AM' : 'PM'
  let displayHour = hour % 12
  if (displayHour === 0) displayHour = 12
  return `${displayHour} ${period}`
}

function AgendaPage({ onBack, vibe, conditions, events = SAMPLE_EVENTS }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const dayStart = START_HOUR
  const totalHours = END_HOUR - START_HOUR + 1

  return (
    <div className="agenda-page">
      <header className="agenda-header">
        <button onClick={onBack} className="agenda-back">
          ← Back
        </button>
        <div className="agenda-title-block">
          <h1>Your day</h1>
          {vibe && <p className="agenda-subtitle">Vibe: {vibe}</p>}
          {conditions && <p className="agenda-subtitle">Notes: {conditions}</p>}
        </div>
      </header>

      <div className="agenda-grid-wrapper">
        <div
          className="agenda-grid"
          style={{ '--total-hours': totalHours }}
        >
          {/* Hour labels + row lines */}
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
                      {formatHourLabel(evt.start)} – {formatHourLabel(evt.end)}
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
            <p>
              {formatHourLabel(selectedEvent.start)} – {formatHourLabel(selectedEvent.end)}
            </p>
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