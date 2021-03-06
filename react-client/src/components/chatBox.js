import React from 'react';
import ChatForm from './chatForm';
import ChatItem from './chatItem';
import axios from 'axios';
import Swal from 'sweetalert2'
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const API_URL = 'http://localhost:3001/api/chat';

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], typer: '' };
        this.autoScroll = null;

        this.deleteTodo = this.deleteTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.loadData = this.loadData.bind(this);
        this.resendTodo = this.resendTodo.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.resendDelete = this.resendDelete.bind(this);
        this.typingChat = this.typingChat.bind(this);
    }

    componentDidMount() {
        this.loadData()
        this.scrollToBottom();

        socket.on('loadchat', (data) => {
            this.loadData()
        })

        socket.on('typing', (typer) => {
            this.setState({
                typer
            })
        })

        socket.on('stoptyping', () => {
            this.setState({
                typer: ''
            })
        })

        socket.on('deletechat', (id) => {
            this.setState(state => ({
                data: state.data.filter(data => data.id !== id)
            }));
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    loadData() {
        axios.get(API_URL)
            .then((response) => {
                this.setState({
                    data: response.data.data.map(item => {
                        return { ...item, status: true }
                    })
                })
            })
            .catch((error) => {
                // handle error
                // console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    resendTodo(id, name, message) {
        this.resendDelete(id)
        this.addTodo(name, message)
    }

    deleteTodo(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.setState((state) => ({
                    data: state.data.filter(data => data.id !== id)
                }));
                axios.delete(API_URL + `/${id}`).then((response) => {
                    socket.emit('deletechat', id)
                    Swal.fire({
                        type: 'success',
                        title: `Chat from ${response.data.itemDeleted.name} Deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            } else {
                // axios.delete(API_URL + `/${id}`).then((response) => {
                    axios.get(API_URL).then((response) => {
                    Swal.fire({
                        title: 'Cancelled',
                        text: `Chat is Forgiven!`,
                        type: 'error'
                    })
                })
            }
        })
    }

    resendDelete(id) {
        this.setState((state, props) => ({
            data: state.data.filter(data => data.id !== id)
        }));
        axios.delete(API_URL + `/${id}`).then((response) => {
        })
    }

    addTodo(name, message) { //name, message
        let id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, status: true }], typer: ''
        }));
        axios.post(API_URL, { id, name, message })
            .then((response) => {
                socket.emit('addchat')
                socket.emit('stoptyping')
                return { ...response.data.itemAdded, status: true }
            })
            .catch((error) => {
                // console.log(error);
                this.setState({
                    data: this.state.data.map(item => {
                        if (item.id === id) {
                            item.status = false
                        }
                        return item
                    })
                })
            });
    }

    scrollToBottom = () => {
        if (this.autoScroll) {
            this.autoScroll.scrollIntoView({ behavior: 'smooth' })
        }
    }

    typingChat = (name) =>  {
        socket.emit('typing', name)
    }

    render() {
        return (
            <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="masthead mb-auto"></header>
                <main className="inner cover dashboard-main" role="main">
                    <div className="card">
                        <div className="card-header text-center style={{color: '#fff'}}">
                            <h1 style={{ fontWeight: 600 }}>React Chat</h1>
                            <p className="text-center">{this.state.typer.length > 0 ? `${this.state.typer} is typing ...` : ""}</p>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <div className="scrollable" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    <ChatItem data={this.state.data} deleteTodo={this.deleteTodo} resendTodo={this.resendTodo} />
                                    <div ref={(event) => { this.autoScroll = event }}></div>
                                    <hr />
                                </div>
                                <ChatForm addTodo={this.addTodo} setTyper={this.typingChat} />
                            </ul>
                        </div>
                    </div>
                </main>
                <footer className="mastfoot mt-auto"></footer>
            </div>
        )
    }
}