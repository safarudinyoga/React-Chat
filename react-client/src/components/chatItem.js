import React from 'react';
import Item from './item';

function ChatItem(props) {
    let butcolor = ['btn-info', 'btn-success', 'btn-warning', 'btn-danger', 'btn-dark','btn-light']
    const list = props.data.map((item, index) =>
        <Item key={index} id={item.id} name={item.name} status={item.status} message={item.message} color={butcolor[index % 6]} sent={item.sent} removeItem={() => props.deleteTodo(index)} resendItem={() => props.resendTodo(item.id, item.name, item.message)}/>
        )//{...item} buat mecah item langsung

    return (
        <div>
            {list}
        </div>
    )
}

export default ChatItem;