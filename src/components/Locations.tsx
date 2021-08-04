import React, {useEffect, useState} from "react";
import {Episode, Location} from "../Interfaces/interfaces";
import {dateParser} from "../utils/DateParser";
import {FetchData} from "../redux/actions/actions";
import {connect} from "react-redux";



interface IProps {
    FetchData(caller: string,page: number): Function
    DataReducer: any
}



const Locations = (props: IProps) => {
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState([]);
    const [apiData, setApiData]: [Location[], Function] = useState([])
    useEffect(() => {
        props.FetchData("location",page)
        setApiData(props.DataReducer.results)
        setInfo(props.DataReducer.info)
    },[props.FetchData, page])



    useEffect(() => {
        setApiData(props.DataReducer.results)
        setInfo(props.DataReducer.info)
        console.log(info, apiData)
    }, [props.DataReducer])


    const RenderList = () => {
        return apiData?.map(el => {
            return (
                <tr key={el.name}>
                    <td>
                        {el.name}
                    </td>
                    <td className="">
                        {el.dimension}
                    </td>
                    <td className="">
                        {el.type}
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
                            <button className={`table_sortableBtn`}>DIMENSION<i className={`angle ${2 === 2 ? "up" : "down"} icon`}></i></button>
                        </th>
                        <th>
                            <button className={"table_sortableBtn"}>TYPE<i className={`angle ${3 === 3 ? "up" : "down"} icon`}></i></button>
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

export default connect(mapStateToProps, {FetchData})(Locations)