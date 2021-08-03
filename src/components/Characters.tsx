import React, {useEffect, useState} from "react";
import {FetchCharacters} from "../redux/actions/actions";
import {connect} from "react-redux";
import {Character, CharacterInfo} from "../Interfaces/interfaces";

interface IProps {
    FetchCharacters(page: number): Function
    CharactersReducer: any
}

const Characters: React.FC<IProps> = (props): JSX.Element => {
const [apiData, setApiData]: [Character[], Function] = useState([]);
const [page, setPage] = useState(1)
    useEffect(() => {
        setApiData(props.CharactersReducer.results)
    },[props.CharactersReducer])


    useEffect(() => {
        props.FetchCharacters(page)

    },[props.FetchCharacters, page])


    console.log(apiData)


    const RenderList = () => {
        return apiData?.map((el:Character, index: number) => {
            return (
                <div className="char_item">
                    <div className="ui card">
                        <div className="image"><img src={el.image} /></div>
                        <div className="content">
                            <a className="header">{el.name}</a>
                            <div className="meta">
                                <span className="date">{el.status}</span>
                            </div>
                            <div className="description">
                                {el.location.name}
                            </div>
                        </div>
                        <div className="extra content">
                            <a>
                                <i className="user icon"/>
                                22 Friends
                            </a>
                        </div>
                    </div>
                </div>
            )})

    }

    const RenderPages = () => {
    let pages = []
      for (let i = 1;i< props.CharactersReducer?.info?.pages + 1;i++) {

          pages.push(<a onClick={() => setPage(i)} className={`item ${page === i ? "active" : ""}`}>{i}</a>)

        }
      return pages
    }


    /*
    *
    *
    * */


    return (
        <div className="container">
            <div className="ui pointing menu">
                {RenderPages()}
            </div>
            <div className="chars">
                {RenderList()}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps, {FetchCharacters})(Characters)