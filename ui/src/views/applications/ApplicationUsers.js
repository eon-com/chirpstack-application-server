import React, { Component } from 'react';
import { Link } from 'react-router';

import ApplicationStore from "../../stores/ApplicationStore";

class ApplicationUserRow extends Component {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this application user (this does not remove the user itself)?")) {
      ApplicationStore.removeUser(this.props.application.id, this.props.user.id, (responseData) => {});
    }
  }

  toggleAdmin(e) {
    e.preventDefault();
    ApplicationStore.updateUser(this.props.application.id, this.props.user.id, {isAdmin: !this.props.user.isAdmin}, (responseData) => {});
  }

  render() {
    return(
      <tr>
        <td>{this.props.user.id}</td>
        <td>{this.props.user.username}</td>
        <td>
          <a href="#" onClick={this.toggleAdmin}>
            <span className={"glyphicon glyphicon-" + (this.props.user.isAdmin ? 'ok' : 'remove')} aria-hidden="true"></span>
          </a>
        </td>
        <td>
          <button type="button" className="btn btn-link btn-xs" onClick={this.onDelete}>Remove</button>
        </td>
      </tr>    
    );
  }
}


class ApplicationUsers extends Component {
  constructor() {
    super();

    this.state = {
      application: {},
      users: [],
    };

  }

  componentWillMount() {
    ApplicationStore.getApplication(this.props.params.applicationID, (application) => {
      this.setState({
        application: application,
      });
    });

    ApplicationStore.getUsers(this.props.params.applicationID, (users) => {
      this.setState({
        users: users,
      });
    });

    ApplicationStore.on("change", () => {
      ApplicationStore.getUsers(this.props.params.applicationID, (users) => {
        this.setState({
          users: users,
        });
      });
    });
  }

  render() {
    const UserRows = this.state.users.map((user, i) => <ApplicationUserRow key={user.id} application={this.state.application} user={user} />);

    return(
      <div>
        <ol className="breadcrumb">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/applications">Applications</Link></li>
          <li><Link to={`/applications/${this.state.application.id}`}>{this.state.application.name}</Link></li>
          <li className="active">Users</li>
        </ol>
        <div className="clearfix">
          <div className="btn-group pull-right" role="group" aria-label="...">
            <Link to={`/applications/${this.state.application.id}/users/create`}><button type="button" className="btn btn-default">Add user</button></Link>
          </div>
        </div>
        <hr />
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="col-md-1">ID</th>
                  <th>Username</th>
                  <th className="col-md-1">Admin</th>
                  <th className="col-md-1"></th>
                </tr>
              </thead>
              <tbody>
                {UserRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationUsers;