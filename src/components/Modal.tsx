import React, {useEffect, useState} from "react"
import {createPortal} from "react-dom";
import {Character} from "../Interfaces/interfaces";

const Element = document.querySelector("#modal") as HTMLElement;


interface IProps {
    modalHandler(con: boolean): void
    charData: data
}

type data = Character | any

const Modal = (props: IProps) => {
    const [modalData, setModalData]: [data, Function] = useState({})
    useEffect(() => {
        setModalData(props.charData)
    },[props.charData])
    return createPortal(
        <div onClick={() => props.modalHandler( false)} className="ui dimmer modals visible active modalWindow">
            <div onClick={e => e.stopPropagation()} className="ui standard modal visible active modal_body">
                <>
                    <div className="header modal_header">Name: {modalData?.name}</div>
                    <div className="ui items">
                    <div className="item">
                        <div className="image">
                            <img src={modalData?.image}/>
                        </div>
                        <div className="content">
                                <span className="header">Gender: {modalData?.gender}</span>
                            <br/>
                            <br/>
                                <span className="header">Species: {modalData?.species}</span>
                            <br/>
                            <br/>
                                <span className="header">Location: {modalData?.location?.name}</span>
                            <br/>
                                <br/>
                            <span className="header">Origin: {modalData?.origin?.name}</span>
                            <br/>
                            <br/>
                            <div className="description">
                                <p>Status: {modalData?.status}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="actions">
                        <button onClick={() => props.modalHandler( false)} className="ui inverted red button">Back</button>
                    </div>
                </>
            </div>
        </div>
        ,
        Element
    )
}


export default Modal