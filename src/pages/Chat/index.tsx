import { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { USER } from "../../assets";
import { API_INBOX_MESSAGE, API_INBOX_ROOM_LIST, API_INBOX_ROOM_SEARCH } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error } from "../../Common/notify";
import { FORMAT_DATE, FORMAT_DAY, FORMAT_TIME } from "../../constants/general.constant";
import Layout from "../../components/Layout";
import PopUpCreateRoom from "./PopUpCreateRoom";
import WebSocketService from "../../ws";

const Chat = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [listRoom, setListRoom] = useState([])
    const [messageRoom, setMessageRoom] = useState<any>([]);
    const [message, setMessage] = useState<string>("");
    const [namePatient, setNamePatient] = useState<string>("");
    const [idRoom, setIdRoom] = useState<string>("");

    const [isShowPopUp, setIsShowPopUp] = useState<boolean>(false);

    const fileImageInputRef = useRef<any>(null);
    const messageRef = useRef<any>(null)

    const [selectedFile, setSelectedFile] = useState<any>(null);

    const [triggerSendMessage, setTriggerSendMessage] = useState(false);

    useEffect(() => {
        getListInboxRoom()
    }, [])

    const webSocketService = WebSocketService();
    console.log("webSocketService:", webSocketService)

    useEffect(() => {
        webSocketService.connect();

        // return () => {
        //     webSocketService.disconnect();
        // };
    }, []);

    // useEffect(() => {
    //     webSocketService.subscribe(`/topic/receive-message/${idRoom}`, (message: any) => {
    //         console.log('Received message:', message);
    //     });

    //     return () => {
    //         // Unsubscribe or do cleanup when the component is unmounted
    //     };
    // }, [webSocketService]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' })

        if (idRoom) {
            getMessageByRoom(idRoom);
        }
    }, [triggerSendMessage])

    const searchPatient = () => {
        const url = `${url_api}${API_INBOX_ROOM_SEARCH}`;

        axios
            .get(url, defineConfigGet({ name: namePatient }))
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                }
            })
            .catch((err) => {
                console.log("error get rooms:", err);
            });
    }

    const getListInboxRoom = () => {
        const url = `${url_api}${API_INBOX_ROOM_LIST}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setListRoom(resp.data);
                }
            })
            .catch((err) => {
                console.log("error get rooms:", err);
            });
    }

    const getMessageByRoom = (roomId: string) => {
        const url = `${url_api}${API_INBOX_MESSAGE}${roomId}/message`;

        axios
            .get(url, defineConfigGet({ page: 0, size: 100 }))
            .then((resp: any) => {
                if (resp) {
                    const data = resp.data
                    const sortedData: any = [...data].sort(
                        (a, b) => a.created_at - b.created_at
                    );
                    setMessageRoom(sortedData);
                }
            })
            .catch((err) => {
                console.log("error get message by room:", err);
            });
    }

    const handleGetMessageByRoom = (roomId: string) => {
        getMessageByRoom(roomId);
    }

    const handleSendMessage = () => {
        const rqMessage = {
            roomId: idRoom,
            message: message,
            file: selectedFile ? selectedFile : null
        };

        webSocketService.sendMessage('/app/send-message', rqMessage);

        // setMessage('');
    }

    const handleSearchPatient = () => {
        searchPatient()
    }

    const handleClickFileImage = () => {
        if (fileImageInputRef.current) {
            fileImageInputRef.current.click();
        }
    };

    const handleFileImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file)
    };


    return (
        <Layout>
            <section className="chat">
                <div className="chat-container">
                    <div className='chat-room'>
                        <div className='chat-room-header'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h3>Message</h3>
                                <span onClick={() => setIsShowPopUp(true)}>
                                    <AddCommentOutlinedIcon />
                                </span>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search by patient name" value={namePatient} onChange={(e: any) => setNamePatient(e.target.value)} />
                                <span className="input-group-text cursor-pointer" onClick={() => handleSearchPatient()}><i className="bi bi-search" ></i></span>
                            </div>
                        </div>
                        <div className='chat-room-content'>
                            {listRoom.length > 0 && listRoom.map((item: any) => {
                                return (
                                    <div className={`chat-room-content-item d-flex justify-content-between ${idRoom === item.id ? "active" : ""}`} onClick={() => { handleGetMessageByRoom(item.id); setIdRoom(item.id) }}>
                                        <div className="me-2 my-auto">
                                            <img src={USER} alt="" />
                                        </div>
                                        <div className="w-50 text-break me-2 d-flex flex-column justify-content-between">
                                            <p className="text-break" style={{ textOverflow: "ellipsis" }}>{item.patient.mail}</p>
                                            <p className="mb-0">{item?.last_message?.message}</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-between">
                                            <p>{moment(item?.last_message?.updated_at?.date).format(FORMAT_DATE)}</p>
                                            <p className="mb-0 text-end">{moment(item?.last_message?.updated_at?.date).format(FORMAT_TIME)}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='chat-message'>
                        {idRoom ? <>
                            {listRoom && listRoom.filter((item: any) => { return item.id === idRoom }).map((item: any) => {
                                return (
                                    <div className="d-flex chat-message-header">
                                        <div>
                                            <img src={USER} alt="" />
                                            <span className="fw-bold ms-3">{item.patient.mail}</span>
                                        </div>

                                        <span className="my-auto cursor-pointer">
                                            <InfoOutlinedIcon />
                                        </span>
                                    </div>
                                )
                            })}

                            <div className="chat-message-content">
                                {messageRoom && messageRoom.map((item: any) => {
                                    return (
                                        <div className="chat-message-content-msg mt-3">
                                            {item.inboxMessageMedia?.local_path && <img src={item.inboxMessageMedia.local_path} alt="" className="image-message" />}
                                            <span className="text-message" >{item.message}</span>
                                            <span className="mt-1">{moment(item.created_at).format(FORMAT_DAY)}</span>
                                        </div>
                                    )
                                })}
                                <div ref={messageRef} className="mt-3"></div>
                            </div>

                            <div className="chat-message-footer">
                                <span className="m-auto cursor-pointer" >
                                    <SentimentSatisfiedAltIcon />
                                </span>
                                <div className="message-input">
                                    {selectedFile && <p className="text-end"><img src={URL.createObjectURL(selectedFile)} alt="" className="image-message" /></p>}
                                    <textarea className="form-control" placeholder="Write a message..." value={message} onChange={(e: any) => setMessage(e.target.value)} />
                                </div>
                                <div className="m-auto " >
                                    <span className="me-1 cursor-pointer" onClick={handleClickFileImage}><AddPhotoAlternateIcon /></span>
                                    <input type="file" className="d-none" ref={fileImageInputRef} onChange={handleFileImageChange} />

                                    <span className="send-message cursor-pointer" onClick={() => handleSendMessage()}>
                                        <SendIcon />
                                    </span>
                                </div>
                            </div>
                        </> : <>
                            <div className="">
                                <span className="">Select a chat to start message</span>
                            </div>
                        </>}
                    </div>
                </div>
            </section>

            {isShowPopUp && <PopUpCreateRoom handleShowPopUp={setIsShowPopUp} />}
        </Layout>
    );
};

export default Chat;
