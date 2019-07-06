import React, { Component } from "react";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';





function createData(id, message, timestamp) {
    return { id, message, timestamp };
}

const rows = [
    createData(),
];

class TrailersDb extends Component {
    // initialize our state
    constructor() {
        super();
        this.state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        };
    }
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        axios.get('/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
        return axios.get("/api/getData");
    };

    // our put method that uses our backend api
    // to create new query into our data base
   putDataToDB = (message) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('api/putData', {
            id: idToBeAdded,
            message: message,
        });
       return axios.post("/api/putData");
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
        parseInt(idTodelete);
        let objIdToDelete = null;
        this.state.data.forEach((dat) => {
            if (dat.id == idTodelete) {
                objIdToDelete = dat._id;
            }
        });

        axios.delete('/api/deleteData', {
            data: {
                id: objIdToDelete,
            },
        });
        return axios.delete("/api/deleteData/");
    };

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.state.data.forEach((data) => {
            if (data.id == idToUpdate) {
                objIdToUpdate = data._id;
            }
        });

        axios.post('/api/updateData', {
            id: objIdToUpdate,
            update: { message: updateToApply },
        });
        return axios.post("/api/putData");
    };
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const Data = {
            data: this.state.data,
            id: this.state.id,
            message: this.state.message,
            intervalIsSet: this.state.intervalIsSet,
            idToDelete: this.state.idToDelete,
            idToUpdate: this.state.idToUpdate,
            objectToUpdate: this.state.objectToUpdate,
        };
        console.log(Data);
        this.props.Data(Data);
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { data } = this.state;

        return (
            <div>
            <div id="tms">
                <ul>
                    {data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((data) => (
                            <li style={{ padding: '10px' }} key={data.message}>
                                <span style={{ color: 'gray' }}> id: </span> {data.id} <br />
                                <span style={{ color: 'gray' }}> data: </span>
                                {data.message}
                            </li>
                        ))}
                </ul>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        onChange={(e) => this.setState({ message: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: '500px' }}
                    />

                    <button onClick={() => this.putDataToDB(this.state.message)}>
                        ADD
            </button>
                </div>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        style={{ width: '500px' }}
                        onChange={(e) => this.setState({ idToDelete: e.target.value })}
                        placeholder="put id of item to delete here"
                    />
                    <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                        DELETE
            </button>
                </div>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        style={{ width: '500px' }}
                        onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                        placeholder="id of item to update here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                        UPDATE
            </button>
                </div>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        style={{ width: '500px' }}
                        onChange={(e) => this.setState({ updateToApply: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                        UPDATE
            </button>
                </div>
            </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Trailer Id</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.message}</TableCell>
                                    <TableCell>{row.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default TrailersDb;