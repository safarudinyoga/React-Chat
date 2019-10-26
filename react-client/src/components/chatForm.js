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
        this.handleKey = this.handleKey.bind(this);
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

    handleKey(event) {
        if(event.keyCode === 13 && !event.shiftKey){
            event.preventDefault()
            let button = document.getElementById('buttonsubmit');
            button.click();
        }
    }


    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <li className="list-group-item borderless d-flex justify-content-between align-items-center">
                    <button id="buttonsubmit" className="btn btn-light btn-circle btn-circle-lg m-1" type="submit"><i
                        className="fa fa-plus fa-2x"></i></button>
                    <div className="speech-bubble col-11">
                        <div className="form-label-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" value={this.state.name} autoFocus={true} onChange={this.handleChange} onKeyUp={this.handleKey} required={true} />
                        </div>
                        <div className="form-label-group my-0">
                            <textarea name="message" className="form-control" placeholder="Type your message here ..." value={this.state.message} autoFocus={true} onKeyUp={this.handleKey} onChange={this.handleChange} required={true} />
                        </div>
                    </div>
                </li>
            </form>
        )
    }
}