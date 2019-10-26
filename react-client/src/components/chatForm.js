import React from 'react';
// import ChatItem from './chatItem'


export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addTodo(this.state.name.trim(), this.state.message.trim());
        this.setState({
            name: '',
            message: ''
        })
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <li className="list-group-item borderless d-flex justify-content-between align-items-center">
                    <button className="btn btn-light btn-circle btn-circle-lg m-1" type="submit"><i
                        className="fa fa-plus fa-2x"></i></button>
                    <div className="speech-bubble col-11">
                        <div className="form-label-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange} required={true} />
                        </div>
                        <div className="form-label-group my-0">
                            <textarea name="message" className="form-control" placeholder="Type your message here ..." value={this.state.message} onChange={this.handleChange} required={true} />
                        </div>
                    </div>
                </li>
            </form>
        )
    }
}