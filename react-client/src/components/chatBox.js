import React from 'react';
import ChatForm from './chatForm';
import ChatItem from './chatItem';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chat'

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        this.deleteTodo = this.deleteTodo.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        axios.get(API_URL)
            .then((response) => {
                // handle success
                console.log("response >", response);
                this.setState({
                    data: response.data.data.map(item => {
                        item.sent = true;
                        return { ...item, status: true }
                    })
                })
                console.log(response);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    deleteTodo(id) {
        this.setState((state, props) => ({
            data: state.data.filter((item, index) => index !== id)
        }));
    }

    addTodo(name, message) { //name, message
        let id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, name, message, status: true }]
        }));
        axios.post(API_URL, { id, name, message })
            .then((response) => {
                let data = { ...response.data.itemAdded, status: true }
            })
            .catch(function (error) {
                // console.log(error);
                this.setState((state, props) => ({
                    data: state.date.map((data => {
                        if (data.id === id) {
                            data.status = false
                        }
                        return data
                    }))
                }))
            });
    }

    render() {
        return (
            <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="masthead mb-auto"></header>
                <main className="inner cover dashboard-main" role="main">
                    <div className="card">
                        <div className="card-header text-center style={{color: '#fff'}}">
                            <h1 style={{ fontWeight: 600 }}>React Chat</h1>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <div className="scrollable" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    <ChatItem data={this.state.data} deleteTodo={this.deleteTodo} />
                                </div>
                                <ChatForm addTodo={this.addTodo} />
                            </ul>
                        </div>
                    </div>
                </main>
                <footer className="mastfoot mt-auto"></footer>
            </div>
        )
    }
}