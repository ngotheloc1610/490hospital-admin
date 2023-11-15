import { USER } from "../../assets";
import Layout from "../../components/Layout";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { useEffect, useRef } from "react";

const Chat = () => {
    const messageRef = useRef<any>(null)

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return (
        <Layout>
            <section className="chat">
                <div className="chat-container">
                    <div className='chat-room'>
                        <div className='chat-room-header'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h3>Message</h3>
                                <span>
                                    <AddCommentOutlinedIcon />
                                </span>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search by patient name" />
                                <span className="input-group-text" id=""><i className="bi bi-search" ></i></span>
                            </div>
                        </div>
                        <div className='chat-room-content'>
                            <div className="chat-room-content-item d-flex justify-content-between">
                                <div>
                                    <img src={USER} alt="" />
                                </div>
                                <div>
                                    <p>test@gmail.com</p>
                                    <p>hello</p>
                                </div>
                                <div>
                                    <p>11/15/2023</p>
                                    <p>15:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='chat-message'>
                        <div className="d-flex chat-message-header">
                            <div>
                                <img src={USER} alt="" />
                                <span className="fw-bold ms-3">test@gmail.com</span>
                            </div>

                            <span className="my-auto">
                                <InfoOutlinedIcon />
                            </span>
                        </div>

                        <div className="chat-message-content">
                            <div className="chat-message-content-msg">
                                <span className='text-message mb-1'>message</span>
                                <span>16/11/2023 16:00</span>
                                <div ref={messageRef}></div>
                            </div>
                        </div>

                        <div className="chat-message-footer">
                            <span className="m-auto" >
                                <SentimentSatisfiedAltIcon />
                            </span>
                            <div className="message-input">
                                <input type="text" className="form-control" placeholder="Write a message..." />
                            </div>
                            <div className="m-auto" >
                                <span className="me-1">
                                    <AttachFileIcon />
                                </span>
                                <span className="me-1"><AddPhotoAlternateIcon /></span>
                                <span className="send-message">
                                    <SendIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Chat;
