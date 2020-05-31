import React from 'react';
import './App.css';
import MyTable from './component/MyTable';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [{ id: 1, name: "Vinay" }, { id: 2, name: "Nitin" }, { id: 3, name: "Yasin" }, { id: 4, name: "Tathagat" }],
    }
  }

  handleDelete = (id) => {
    this.setState({ users: this.state.users.filter(user => user.id !== id) })
  }

  handleAdd = (user) => {
    this.setState({ users: [...this.state.users, user] })
  }

  handleUpdate = (updateData) => {
    this.setState({ users: this.state.users.map(user => user.id !== updateData.id ? user : updateData) })
  }

  render() {
    console.log(this.state.users)
    return (
      <div>
        <MyTable
          users={this.state.users}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          handleAdd={this.handleAdd}
        ></MyTable>
      </div>

    )
  }

}


export default App;
