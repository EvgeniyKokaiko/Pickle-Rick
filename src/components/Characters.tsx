import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { FetchData } from "../redux/actions/actions";
import { connect } from "react-redux";
import { Character } from "../Interfaces/interfaces";
import Modal from "./Modal";

interface IProps {
  FetchData(caller: string, page: number): Function;
  DataReducer: any;
}

const Characters: React.FC<IProps> = (props): JSX.Element => {
  const [apiData, setApiData]: [Character[], Function] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter]: [Character[], Function] = useState([]);
  const [searched, setSearched]: [any, Function] = useState("");
  const [char, setChar]: [Character, Function] = useState({
    created: "",
    episode: [""],
    gender: "",
    id: 0,
    image: "",
    location: { name: "", url: "" },
    name: "",
    origin: { name: "", url: "" },
    species: "",
    status: "",
    type: "",
    url: "",
  });
  const [modal, showModal] = useState(false);
  useEffect(() => {
    setApiData(props.DataReducer.results);
    console.log(apiData);
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
      const Filter: Character[] = apiData.filter((el) => {
        return (
          el.name.toLowerCase().includes(String(searched.toLowerCase())) ||
          el.status.toLowerCase().includes(String(searched.toLowerCase())) ||
          el.species.toLowerCase().includes(String(searched.toLowerCase())) ||
          el.gender.toLowerCase().includes(String(searched.toLowerCase()))
        );
      });
      setFilter(Filter);
    }
  }, [searched]);

  useEffect(() => {
    props.FetchData("character", page);
  }, [props.FetchData, page]);

  const RenderModal = (modalHandler: Function, modalData: Character) => {
    return (
      <>
        <div className="header modal_header">Name: {modalData?.name}</div>
        <div className="ui items">
          <div className="item">
            <div className="image">
              <img src={modalData?.image} />
            </div>
            <div className="content">
              <span className="header">Gender: {modalData?.gender}</span>
              <br />
              <br />
              <span className="header">Species: {modalData?.species}</span>
              <br />
              <br />
              <span className="header">
                Location: {modalData?.location?.name}
              </span>
              <br />
              <br />
              <span className="header">Origin: {modalData?.origin?.name}</span>
              <br />
              <br />
              <div className="description">
                <p>Status: {modalData?.status}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            onClick={() => modalHandler(false)}
            className="ui inverted red button"
          >
            Back
          </button>
        </div>
      </>
    );
  };

  function ModalInfo(char: Character, cond: boolean) {
    setChar(char);
    showModal(cond);
  }

  const RenderList = () => {
    return renderCondition()?.map((el: Character, index: number) => {
      return (
        <div className="char_item">
          <div className="ui card">
            <div className="image">
              <img src={el?.image} />
            </div>
            <div className="content">
              <span className="header">{el?.name}</span>
              <div className="meta">
                <span className="date">{el?.status}</span>
              </div>
              <div className="description">{el?.location?.name}</div>
            </div>
            <div className="extra content">
              <button
                onClick={() => {
                  ModalInfo(el, true);
                }}
                style={{ width: "100%" }}
                className="ui inverted red button"
              >
                Show Character Info
              </button>
            </div>
          </div>
        </div>
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
          onClick={() => {setPage(i);setSearched("")}}
          className={`item ${page === i ? "active" : ""}`}
        >
          {i}
        </a>
      );
    }
    return pages;
  };

  return modal === false ? (
    <div className="container">
      <div className="ui pointing menu">{RenderPages()}</div>
      <div
        style={{ marginBottom: "2%", marginLeft: "9%" }}
        className="ui icon input"
      >
        <input
          style={{ width: "80vw" }}
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          type="text"
          placeholder="Search by: Name, Gender, Status, Species..."
        />
        <i className="search icon"></i>
      </div>
      <div className="chars">{RenderList()}</div>
    </div>
  ) : (
    <Modal modalHandler={showModal} charData={char} modalData={RenderModal} />
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps, { FetchData })(Characters);
