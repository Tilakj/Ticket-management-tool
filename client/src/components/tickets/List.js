import React from "react";
import { Link } from "react-router-dom";
import TicketsTable from "./TicketsTable";
import axios from "../../config/axios";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import groupBy from 'lodash/groupBy'

class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      selectedView: "pending",
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("authToken"))
      this.props.history.push("/users/login");

    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((res) => {
        axios
          .get("/tickets", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((res) => {
            const tickets = res.data;
            this.setState({ tickets, loading: false });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRemove = (id) => {
    const confirmDelete = window.confirm('Are you sure?')
    if (confirmDelete) {

      axios.delete(`/tickets/${id}`, {
        headers: {
          'x-auth': localStorage.getItem('authToken')
        }
      })
        .then(res => {
          const deletedTickets = res.data
          this.setState(prevState => {
            return {
              tickets: prevState.tickets.filter(ticket => ticket._id !== deletedTickets._id)
            }
          })
        })
        .catch(err => {
          alert(err)
        })
    }
  }

  handleChange = (view) => {
    this.setState({ selectedView: view });
  };

  handleTicketComplete = (e, ticketId) => {
    // const selectedTicket = { ...this.state.tickets.find(ticket => ticket._id === ticketId) }
    const isResolved =
      e.target.id === "complete" ? !e.target.checked : e.target.checked;
    axios
      .put(
        `/tickets/${ticketId}`,
        { isResolved },
        {
          headers: {
            "x-auth": localStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        const selectedTicket = res.data;
        this.setState((prevState) => {
          return {
            tickets: [
              ...prevState.tickets.filter(
                (ticket) => ticket._id !== selectedTicket._id
              ),
              selectedTicket,
            ],
          };
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  getOccurences = (tickets, dataObj) => {
    tickets.forEach((ticket) => {
      if (!dataObj.hasOwnProperty(ticket.department?.name)) {
        dataObj[ticket.department?.name] = 1;
      } else {
        dataObj[ticket.department?.name]++;
      }
    });
    return dataObj;
  };

  render() {
    const completedTickets = this.state.tickets.filter(ticket => ticket.isResolved);
    const pendingTickets = this.state.tickets.filter(ticket => !ticket.isResolved);

    const deptData = {};
    this.state.tickets
      .map((ticket) => ticket?.department?.name)
      .filter((dept, i, arr) => arr.indexOf(dept) === i)
      .forEach((dept) => (deptData[dept] = 0));

    const pendingData = this.getOccurences(pendingTickets, { ...deptData });
    const completedData = this.getOccurences(completedTickets, { ...deptData });

    const pieData = groupBy(this.state.tickets, 'priority')

    return (
      <div style={{ marginTop: "2%" }}>
        <div className="my-3">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <p onClick={() => this.handleChange("pending")} className={`nav-link ${this.state.selectedView === "pending" && "active"}`} >Pending</p>
            </li>
            <li className="nav-item">
              <p onClick={() => this.handleChange("completed")} className={`nav-link ${this.state.selectedView === "completed" && "active"}`}>Completed</p>
            </li>
          </ul>
        </div>

        {
          this.state.selectedView === "pending" ?
            (<TicketsTable handleRemove={this.handleRemove} pending handleTicketComplete={this.handleTicketComplete} tickets={pendingTickets} {...this.props} />)
            : (<TicketsTable handleRemove={this.handleRemove} handleTicketComplete={this.handleTicketComplete} tickets={completedTickets}  {...this.props} />
            )}

        <br />
        <Link className="btn btn-primary btn-sm mb-3" to="/tickets/new">Add Ticket</Link>

        <div className="row mt-3">
          <div className="col-6">
            <PieChart pieData={pieData} />
          </div>
          <div className="col-6">
            <BarChart completedData={completedData} pendingData={pendingData} />
          </div>
        </div>

      </div>
    );
  }
}

export default TicketList;
