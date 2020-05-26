import React from 'react'

function TicketsTable(props) {

    return (
        <div>
            {props.pending ? <h2>Pending Tickets - {props.tickets.length}</h2> : <h2>Completed Tickets - {props.tickets.length}</h2>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>code No</th>
                        <th>Customer</th>
                        <th>Department</th>
                        <th>Employees</th>
                        <th>Message</th>
                        <th>Priority</th>
                        <th>Actions</th>
                        <th>Remove</th>
                        {props.pending ? <th>Complete</th> : <th>Not Complete</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.tickets.map(function (ticket) {
                            return (
                                <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td>{ticket.customer?.name}</td>
                                    <td>{ticket.department?.name}</td>
                                    <td>{ticket.employees?.map(emp => emp.name).join(',')}</td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td><button className="btn btn-info btn-sm" onClick={() => props.history.push(`/tickets/${ticket._id}`)}>Show</button></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={()=>props.handleRemove(ticket._id)}>Remove</button></td>
                                    <td>{props.pending ? <input type="checkbox" name="pending" id="pending" checked={ticket.isResolved} onChange={(e) => props.handleTicketComplete(e, ticket._id)} /> :
                                        <input type="checkbox" name="complete" id="complete" checked={!ticket.isResolved} onChange={(e) => props.handleTicketComplete(e, ticket._id)} />}</td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>

        </div>
    )

}

export default TicketsTable