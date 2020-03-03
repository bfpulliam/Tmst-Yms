import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../../../actions/productsActions";
import { getTasks, deleteTask } from "../../../../actions/taskActions";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";


class Product extends Component {
    state = {
        modal: false,
        edit: false,
        editTask: false,
        task: false,
        name: "",
        members: [],
        id: "",
        owner: {},
        tasks: [],
        date: "",
        taskName: "",
        assignee: "",
        taskId: "",
        dateDue: ""
    };

    toggleModal = e => {
        this.setState({
            modal: !this.state.modal,
            edit: false,
            task: false,
            editTask: false
        });
    };

    toggleEditModal = (name, members, id, owner, e) => {
        this.setState({
            modal: !this.state.modal,
            edit: !this.state.edit,
            name: name,
            members: members,
            id: id,
            owner: owner
        });
    };

    toggleTaskModal = e => {
        this.setState({
            modal: !this.state.modal,
            task: !this.state.task
        });
    };

    toggleEditTaskModal = (taskName, assignee, dateDue, id, e) => {
        this.setState({
            modal: !this.state.modal,
            editTask: !this.state.editTask,
            taskName: taskName,
            assignee: assignee,
            taskId: id,
            dateDue: dateDue
        });
    };

    componentDidMount() {
        this.props.getProduct(this.props.match.params.product);
        this.props.getTasks(this.props.match.params.product);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.product !== prevProps.match.params.product) {
            this.props.getProduct(this.props.match.params.product);
            this.props.getTasks(this.props.match.params.product);
        }
    }

    onChange = async e => {
        await this.setState({ tasks: this.props.tasks.tasks });

        let tasks = await [...this.state.tasks];

        tasks[e.target.id].taskName = await e.target.value;

        await this.setState({ tasks });
    };

    deleteTask = id => {
        this.props.deleteTask(id);
    };

    render() {
        const { tasks } = this.props.tasks;

        let tasksList = tasks.map((task, index) => (
            <div className="task-input" key={task._id}>
                <i
                    className="material-icons check-task"
                    onClick={this.deleteTask.bind(this, task._id)}
                >
                    check_circle
        </i>
                <span
                    onClick={this.toggleEditTaskModal.bind(
                        this,
                        task.taskName,
                        task.assignee,
                        task.dateDue,
                        task._id
                    )}
                    id={index}
                    name="task"
                    className="product-task"
                >
                    {task.taskName}
                </span>
                <span
                    onClick={this.toggleEditTaskModal.bind(
                        this,
                        task.taskName,
                        task.assignee,
                        task.dateDue,
                        task._id
                    )}
                    className={!task.assignee ? "task-info muted" : "task-info"}
                >
                    {task.assignee === this.props.auth.user.email
                        ? "You"
                        : task.assignee || "Unassigned"}
                </span>
                <span
                    onClick={this.toggleEditTaskModal.bind(
                        this,
                        task.taskName,
                        task.assignee,
                        task.dateDue,
                        task._id
                    )}
                    className={
                        task.dateDue === "Date undefined" ? "task-info muted" : "task-info"
                    }
                >
                    {task.dateDue === "Date undefined" ? "Not Set" : task.dateDue}
                </span>
            </div>
        ));

        if (
            this.props.product &&
            this.props.product.teamMembers &&
            !this.props.products.productLoading &&
            !this.props.tasks.tasksLoading
        ) {
            const { product } = this.props;

            return (
                <div className="main-content">
                    <h1 className="product-header">{product.name}</h1>
                    <button
                        onClick={this.toggleEditModal.bind(
                            this,
                            product.name,
                            product.teamMembers,
                            product._id,
                            product.owner
                        )}
                        className="main-btn center-btn"
                    >
                        Edit Product Info
          </button>

                    <div className="modal-wrapper">
                        <Modal
                            onClose={this.toggleModal}
                            modal={this.state.modal}
                            edit={this.state.edit}
                            task={this.state.task}
                            editTask={this.state.editTask}
                            name={this.state.name}
                            members={this.state.members}
                            id={this.state.id}
                            owner={this.state.owner}
                            taskName={this.state.taskName}
                            assignee={this.state.assignee}
                            dateDue={this.state.dateDue}
                            taskId={this.state.taskId}
                        />
                    </div>
                    <div className="tasks-container">
                        <div className="products-first-row">
                            <button
                                className="main-btn add-btn"
                                onClick={this.toggleTaskModal}
                            >
                                Add task
              </button>
                            <div className="products-column-headers">
                                <p>Assignee</p>
                                <p>Due</p>
                            </div>
                        </div>
                        <div className="product-tasks">{tasksList}</div>
                    </div>
                </div>
            );
        }

        return (
            <div className="product-spinner">
                <Spinner />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.products.product,
    products: state.products,
    tasks: state.tasks
});

export default connect(
    mapStateToProps,
    { getProduct, getTasks, deleteTask }
)(Product);