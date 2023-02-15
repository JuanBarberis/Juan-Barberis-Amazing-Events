import { renderCard } from "./module/function.js"

const api = (`https://mindhub-xj03.onrender.com/api/amazing`)
const container = document.getElementById(`description`)



fetch(api)
    .then(response => response.json())
    .then(data => {
        let eventsData = data.events
        const params = new URLSearchParams(location.search)
        const id = params.get("event")
        const eventDescription = eventsData.find(event => event._id == id)
        renderCard(eventDescription, container)

    })
    .catch(error => console.log(error))