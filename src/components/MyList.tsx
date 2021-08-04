import React, {ChangeEvent, useState} from 'react';
import {dateParser} from "../utils/DateParser";
import Logo from "../assets/Logo.png"


interface Todo {
    value: string,
    date: string,
    confirmed: boolean
}



const MyList = () => {



    //Value, Date, Id

    const [term, setTerm] = useState("")
    const [todos, setTodos]: [Todo[], Function] = useState([])
    const [flag, setFlag] = useState(false)
    const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
        const date = dateParser(new Date())
        console.log(date)
        setTodos([...todos, {value: term, date: date, confirmed: false}])
        console.log(todos)
    }



    const RenderTodos = () => {
        return todos?.map(el => {
            return <div className="ui comments">
                <div className="comment">
                    <div style={{float: "right"}} className="ui buttons">
                        <button onClick={() => {el.confirmed = true;setFlag(prev => !prev)}} className={`ui ${el.confirmed === false ? "" : "positive"} button`}>{`${el.confirmed !== false ? "\u2713" : "Confirm"}`}</button>
                        <div className="or"></div>
                        <button className="ui negative button">Delete</button>
                    </div>
                    <span className="avatar">
                        <img src={Logo} />
                    </span>
                    <div className="content">
                        <a className="author">Todo</a>
                        <div className="metadata">
                            <div className="date">{el.date}</div>
                        </div>
                        <div className="text">
                            {el.value}
                        </div>
                    </div>
                </div>
            </div>
        })
    }



    return (
        <div className="ui container" style={{ marginTop: '10px' }}>
            <div className="ui segment" >
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Write something <i className="angle double down icon" /> </label>
                        <input type="text" value={term} onChange={(e:ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}/>
                    </div>
                </form>
            </div>
            <div className="ui segment">{RenderTodos()}</div>
        </div>
    );
};

export default MyList;