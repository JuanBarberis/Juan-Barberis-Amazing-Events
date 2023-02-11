import {renderCard} from "./module/function.js"

const eventsData = data.events
const params = new URLSearchParams(location.search)
const id = params.get( "event" )
const eventDescription = eventsData.find(event => event._id === id)
const container = document.getElementById(`description`)


renderCard(eventDescription,container)

