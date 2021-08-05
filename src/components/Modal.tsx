import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Character } from "../Interfaces/interfaces";

const Element = document.querySelector("#modal") as HTMLElement;

interface IProps {
  modalHandler(con: boolean): void;
  charData: data;
  modalData(modalHandler: Function, modalData: data): ReactNode;
}

type data = Character | any;

const Modal = (props: IProps) => {
  const [modalData, setModalData]: [data, Function] = useState({});
  useEffect(() => {
    setModalData(props.charData);
  }, [props.charData]);
  return createPortal(
    <div
      onClick={() => props.modalHandler(false)}
      className="ui dimmer modals visible active modalWindow"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active modal_body"
      >
        <>{props.modalData(props.modalHandler, modalData)}</>
      </div>
    </div>,
    Element
  );
};

export default Modal;
