import React, { ReactNode, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FetchData } from "../redux/actions/actions";
import { Episode } from "../Interfaces/interfaces";
import { dateParser } from "../utils/DateParser";

interface IProps {
  FetchData(caller: string, page: number): Function;
  DataReducer: any;
}

const Episodes = (props: IProps) => {
  const [page, setPage]: [number, Function] = useState(1);
  const [apiData, setApiData]: [Episode[], Function] = useState([]);
  const [filter, setFilter]: [Episode[], Function] = useState([]);
  const [searched, setSearched]: [string, Function] = useState("");
  useEffect(() => {
    props.FetchData("episode", page);
    setApiData([]);
  }, [props.FetchData, page]);

  useEffect(() => {
    setApiData([]);
    setApiData(props.DataReducer.results);
  }, [props.DataReducer]);

  const renderCondition = () => {
    if (searched === "" || searched === " ") {
      return apiData;
    } else {
      return filter;
    }
  };

  useEffect(() => {
    setFilter([]);
    if (apiData) {
      const Filter: Episode[] = apiData.filter((el) => {
        return (
          el.name.toLowerCase().includes(String(searched.toLowerCase())) ||
          el.episode.toLowerCase().includes(String(searched.toLowerCase()))
        );
      });
      setFilter(Filter);
    }
  }, [searched]);

  const RenderList = () => {
    return renderCondition()?.map((el) => {
      return (
        <tr key={el.created}>
          <td>{el.name}</td>
          <td className="">{el.episode}</td>
          <td className="">{dateParser(el.air_date, 1)}</td>
        </tr>
      );
    });
  };

  const RenderPages = () => {
    let pages: ReactNode[] = [];
    const anchorStyle = { color: "white", border: "2px solid white" };
    for (let i = 1; i < props.DataReducer?.info?.pages + 1; i++) {
      pages.push(
        <a
          style={anchorStyle}
          onClick={() => {
            setPage(i);
            setSearched("")
          }}
          className={`item ${page === i ? "active" : ""}`}
        >
          {i}
        </a>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="ui pointing menu">{RenderPages()}</div>
      <div className="table_body">
        <div className="ui icon input">
          <input
            style={{ width: "70vw" }}
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            type="text"
            placeholder="Search by: Name, Episode..."
          />
          <i className="search icon"></i>
        </div>
        <table className="ui table">
          <thead>
            <tr>
              <th className="">
                <button className="table_sortableBtn">NAME</button>
              </th>
              <th>
                <button className={`table_sortableBtn`}>EPISODE</button>
              </th>
              <th>
                <button className={"table_sortableBtn"}>DATE</button>
              </th>
            </tr>
          </thead>
          <tbody>{RenderList()}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps, { FetchData })(Episodes);
