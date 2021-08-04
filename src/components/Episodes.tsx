import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {FetchData} from "../redux/actions/actions";
import {Episode} from "../Interfaces/interfaces";
import {dateParser} from "../utils/DateParser";


interface IProps {
    FetchData(caller: string,page: number): Function
    DataReducer: any
}

const Episodes = (props: IProps) => {
    const [page, setPage] = useState(1)
    const [apiData, setApiData]: [Episode[], Function] = useState([])

    useEffect(() => {
        props.FetchData("episode",page)
        setApiData([])
    },[props.FetchData, page])
    useEffect(() => {
        setApiData(props.DataReducer.results)
    }, [props.DataReducer])


    const RenderList = () => {
        return apiData?.sort().map(el => {
            return (
                <tr key={el.created}>
                    <td>
                        {el.name}
                    </td>
                    <td className="">
                        {el.episode}
                    </td>
                    <td className="">
                        {dateParser(el.air_date, 1)}
                    </td>
                </tr>
            )
        })
    }


    const RenderPages = () => {
        let pages = []
        const anchorStyle = {color: "white", border: "2px solid white"}
        for (let i = 1;i< props.DataReducer?.info?.pages + 1;i++) {
            pages.push(<a style={anchorStyle}  onClick={() => setPage(i)} className={`item ${page === i ? "active" : ""}`}>{i}</a>)
        }
        return pages
    }

    return (
        <div>
            <div className="ui pointing menu">
                {RenderPages()}
            </div>
            <div className="table_body">
                <table className="ui table">
                    <thead>
                    <tr>
                        <th className="">
                            <button  className="table_sortableBtn">NAME<i className={`angle ${1 === 1 ? "up" : "down"} icon`}></i></button>
                        </th>
                        <th>
                            <button className={`table_sortableBtn`}>EPISODE<i className={`angle ${2 === 2 ? "up" : "down"} icon`}></i></button>
                        </th>
                        <th>
                            <button className={"table_sortableBtn"}>DATE<i className={`angle ${3 === 3 ? "up" : "down"} icon`}></i></button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{RenderList()}</tbody>
                </table>
            </div>
        </div>
    )

}


const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps, {FetchData})(Episodes)