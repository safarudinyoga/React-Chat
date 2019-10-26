import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

function todayConvert(date) {
    let time = moment(date).format(' HH:mm');
    date = moment(date).format('DD-MM-YYYY');
    if (date === moment().format('DD-MM-YYYY')){
        date = 'Today';
    } else if (date === moment().subtract(1, 'days').format('DD-MM-YYYY')){
        date = 'Yesterday';
    }
    return (date + time);
}

function Item(props) {
    return <li className="list-group-item borderless d-flex justify-content-between align-items-center">
        <button type="button" className={`btn ${props.color} btn-circle btn-circle-lg m-1`} onClick={props.removeItem}><i className="fas fa-minus fa-2x"></i></button>
        <div className="speech-bubble col-11">
            <div className="row justify-content-between mx-1">
                <h5>{props.name}</h5>
                <span>
                {props.status ? todayConvert(props.id) :
                        (<button className="btn text-red bg-transparent" onClick={props.resendItem}>resend chat <i className="fas fa-sync-alt "></i>
                        </button>)}
                </span>
            </div>
            <p><ReactMarkdown source={props.message}/></p>
        </div>
    </li>
}

export default Item;