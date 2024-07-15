function timeSince(date) {
    let seconds = Math.floor((new Date() - new Date(date)) / 1000)
    console.log(seconds)
    let interval = seconds / 31536000

    if (interval > 1) {
        return Math.floor(interval) + ' years'
    }
    interval = seconds / 2592000
    if (interval > 1) {
        return Math.floor(interval) + ' months'
    }
    interval = seconds / 86400
    if (interval > 1) {
        return Math.floor(interval) + ' days'
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + ' hours'
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
}

function convertTimeToLocal(time) {
    const date = new Date(time)

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        timeZoneName: 'short'
    }

    return date.toLocaleString(undefined, options)
}

export { timeSince, convertTimeToLocal }
