const TicketStatusOptions = ['Submitted', 'Approved', 'Received Device', 'Repairing', 'Pending Payment', 'Posted To Customer', 'Completed']

const GetStatusName = (id) => {
    if (id == -1) {
        return 'Waiting approval'
    }
    return TicketStatusOptions[id]
}

const GetStatusClass = (id) => {
    if (id === undefined) {
        return ''
    }
    if (id == -1) {
        return 'waitapproval'
    }
    return TicketStatusOptions[id].toLowerCase().split(' ').join('')
}

export { TicketStatusOptions, GetStatusClass, GetStatusName }
