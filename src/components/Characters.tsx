import React, {useEffect, useState} from "react";
import {FetchCharacters} from "../redux/actions/actions";
import {connect} from "react-redux";
import {Character, CharacterInfo} from "../Interfaces/interfaces";
import Modal from "./Modal";

interface IProps {
    FetchCharacters(page: number): Function
    CharactersReducer: any
}

const Characters: React.FC<IProps> = (props): JSX.Element => {
const [apiData, setApiData]: [Character[], Function] = useState([]);
const [page, setPage] = useState(1)
    const [char, setChar]: [Character, Function] = useState({created: "", episode: [""], gender: "", id: 0, image: "", location: {name: "", url: ""}, name: "", origin: {name: "", url: ""}, species: "", status: "", type: "", url: ""});
    const [modal, showModal] = useState(false)
    useEffect(() => {
        setApiData(props.CharactersReducer.results)
    },[props.CharactersReducer])


    useEffect(() => {
        props.FetchCharacters(page)
    },[props.FetchCharacters, page])


    console.log(apiData)


    function ModalInfo(char: Character, cond: boolean) {
        setChar(char)
        showModal(cond)
    }

    const RenderList = () => {
        return apiData?.map((el:Character, index: number) => {
            return (
                <div className="char_item">
                    <div className="ui card">
                        <div className="image"><img src={el.image} /></div>
                        <div className="content">
                            <span className="header">{el.name}</span>
                            <div className="meta">
                                <span className="date">{el.status}</span>
                            </div>
                            <div className="description">
                                {el.location.name}
                            </div>
                        </div>
                        <div className="extra content">
                            <button onClick={() => {ModalInfo(el, true)}} style={{width: "100%"}} className="ui inverted red button">Show Character Info</button>
                        </div>
                    </div>
                </div>
            )})

    }

    const RenderPages = () => {
    let pages = []
        const anchorStyle = {color: "white", border: "2px solid white"}
      for (let i = 1;i< props.CharactersReducer?.info?.pages + 1;i++) {
          pages.push(<a style={anchorStyle}  onClick={() => setPage(i)} className={`item ${page === i ? "active" : ""}`}>{i}</a>)
        }
      return pages
    }

    return (
        modal === false ? <div className="container">
            <div className="ui pointing menu">
                {RenderPages()}
            </div>
            <div className="chars">
                {RenderList()}
            </div>
        </div> : <Modal modalHandler={showModal} charData={char} />
    )
}

const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps, {FetchCharacters})(Characters)