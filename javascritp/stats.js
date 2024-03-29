import{eventStatitics,statsFilter} from "./module/function.js"

const api = (`https://mindhub-xj03.onrender.com/api/amazing`)
const statsContainer = document.getElementById("tableEvents")
const upComingTable = document.getElementById("upcomingtable")
const pastTable = document.getElementById("pasttable")

fetch(api)
    .then(response => response.json())
    .then(data => {
        const eventsData = data.events
        let date = data.currentDate
        let upComingArr = eventsData.filter(item => date < item.date)
        let pastComingArr = eventsData.filter(item => date > item.date)

        statsFilter(upComingArr, upComingTable)
        statsFilter(pastComingArr, pastTable)


        let element1
        let element2
        let element3


        for (let event of pastComingArr) {

            if (element1) {
                let assistance = ((event.estimate ? event.estimate : event.assistance) * 100) / event.capacity
                if (element1.assistance < assistance) {
                    element1.name = event.name
                    element1.assistance = assistance
                }
            } else {
                element1 = {
                    name: event.name,
                    assistance: ((event.estimate ? event.estimate : event.assistance) * 100) / event.capacity
                }
            }


            if (element2) {
                let assistance = ((event.estimate ? event.estimate : event.assistance) * 100) / event.capacity
                if (element2.assistance > assistance) {
                    element2.name = event.name
                    element2.assistance = assistance
                }
            } else {
                element2 = {
                    name: event.name,
                    assistance: ((event.estimate ? event.estimate : event.assistance) * 100) / event.capacity
                }
            }

            if (element3) {
                if (element3.capacity < event.capacity) {
                    element3.name = event.name
                    element3.capacity = event.capacity
                }
            } else {
                element3 = {
                    name: event.name,
                    capacity: event.capacity
                }
            }

        }
        eventStatitics(element1, element2, element3, statsContainer)


    })
    .catch(error => console.log(error))








