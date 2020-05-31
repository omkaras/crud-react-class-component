import React from 'react';

class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdd: false,
            isUpdate: false,
            tempData: { id: "", name: "" },
            currentOp: "",
        }
    }

    add = () => {
        this.setState({ add: true })
    }

    update = (user) => {
        this.setState({ isUpdate: true }, () => { this.setState({ tempData: { id: user.id, name: user.name } }) })
        this.setState({ currentOp: "Update" })
        this.props.handleUpdate(user.id);
    }

    handleChange = (e) => {
        this.setState({ tempData: { ...this.state.tempData, [e.target.name]: e.target.value } })
    }

    showAddDiv = () => {
        this.setState({
            tempData: {
                id: "",
                name: "",
            }
        });
        this.setState({ currentOp: "Add" })
        this.setState({ isAdd: true })
    }

    render(props) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map(user =>
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td><button onClick={() => this.update(user)}>Update</button></td>
                                    <td><button onClick={() => this.props.handleDelete(user.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> <br />
                <button onClick={this.showAddDiv}>Add</button>
                {
                    this.state.isUpdate || this.state.isAdd ?
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (this.state.isUpdate) {
                                this.props.handleUpdate(this.state.tempData);
                            } else {
                                this.props.handleAdd(this.state.tempData);
                            }

                            this.setState({
                                tempData: {
                                    id: "",
                                    name: "",
                                }
                            });
                            this.setState({ isUpdate: false }, () => { this.setState({ isAdd: false }) })
                        }}>
                            <input name="id" placeholder="First Name" value={this.state.tempData.id}
                                onChange={this.handleChange}></input>
                            <input name="name" placeholder="Last Name" value={this.state.tempData.name}
                                onChange={this.handleChange}></input>
                            <button>{this.state.currentOp}</button>
                        </form>
                        :
                        <div></div>
                }

            </div>
        )
    }
}

export default MyTable;