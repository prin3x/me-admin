import axios from 'axios'

export async function _findAllCalendarEvent() {
    return (await axios.get('/calendar-event')).data
}