import React, { useState } from 'react'
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import "./chat.css";
import { io } from "socket.io-client";
import Header from '../Header/header';

const socket = io("http://localhost:4000/");


const Chat = () => {
    const [chatUser, setChatUser] = useState([])
    const [selected, setSelected] = useState("")
    const [chatData, setChatData] = useState([])
    const [message, setMessage] = useState("")
    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    useEffect(() => {
        console.log("user", user)
        if (user) {
            socket.emit("joined", user?.data)
        } else {
            socket.emit("joined", {
                first_name: "ishtiyaq",
                last_name: "khan",
                phone: 12345
            })
        }
        socket.on("user_connect", (data) => {
            // debugger
            setChatUser(data)
        })
        socket.on("reciveMessage",(data)=>{
            debugger
            if(chatData[selected])
            
            setChatData((e)=>{
                return [...e,]
            })
        })
    }, [socket])
    const handleChat = (res) => {
        try {
            setSelected(res?.phone)
        } catch (error) {
            console.log(error)
        }
    }
    const sendMessage = () => {
        if (!message) return;
        setChatData([...chatData, {
            ...user?.data,
            message: message
        }])
        socket.emit("message", {
            ...user?.data,
            message: message,
            reciver:selected
        })
        setMessage("")
    }

    console.log("chatdata", selected)
    return (
        <div>
            <Row>
                <Header />
                <Col className="col-1 no-gutters" md={4}>
                    <p>Col 1</p>
                    <ul className='sideBarChat'>
                        {chatUser.map((res, index) => (
                            <div className={selected === res?.phone ? "selected" : ""} onClick={() => handleChat(res)}>
                                <li>{res?.first_name} {res?.last_name}</li>
                                {/* <span>Last seen</span> */}
                            </div>
                        )
                        )}


                    </ul>
                </Col>
                <Col md={8} className="no-gutters chat-seen" >
                    <p>Col 2</p>
                    {/* <div className='chat-left'>
                        <div className='chat-header'>
                            <span>Name</span>
                            <span>Name</span>
                        </div>
                        <div>Body</div>
                    </div>
                    <div className='chat-right'>
                        <div className='chat-header'>
                            <span>Name</span>
                            <span>Name</span>
                        </div>
                        <div>Body</div>
                    </div> */}
                    {Array.isArray(chatData) && chatData.map((data) => {
                        return (<div className={`${data?.phone != selected ? 'chat-right' : "chat-left"}`}>
                            <div className='chat-header'>
                                <span>{data?.first_name}</span>
                                <span>{data?.last_name}</span>
                            </div>
                            <div>{data?.message}</div>
                        </div>)


                    })}
                    {selected && <div className='message-send'>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={sendMessage}>Send message</button>
                    </div>}
                </Col>
            </Row>
        </div>
    )
}

export default Chat