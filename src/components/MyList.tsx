import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {dateParser} from "../utils/DateParser";
import Logo from "../assets/Logo.png"
import {Todo} from "../Interfaces/interfaces";
import {connect} from "react-redux";
import {AddTodo, DeleteTodo, GetTodo} from "../redux/actions/actions";


interface IProps {
    AddTodo(editValues: (Todo | Todo[])[]): Function
    TodosReducer: Todo[]
    GetTodo(): Function
    DeleteTodo(todos: Todo[], todo: Todo): Function
}



const MyList = (props:IProps) => {

    const [term, setTerm] = useState("")
    const [todos, setTodos]: [Todo[], Function] = useState([])
    const [flag, setFlag] = useState(false)
    const data = props.TodosReducer

    const onFormSubmit = (e: React.FormEvent): void => {
        AddTodo(todos)
        e.preventDefault()
        const date = dateParser(new Date())
        setTodos([...todos, {value: term, date: date, confirmed: false}])
        props.AddTodo([...props.TodosReducer, ...todos])
    }

    useEffect(() => {
        props.GetTodo()
    }, [props.GetTodo])

    useEffect(() => {
        setTodos(props.TodosReducer)
    }, [data])


    const RenderTodos = () => {
        return todos.map(el => {
            return <div key={el.value} className="ui comments">
                <div className="comment">
                    <div style={{float: "right"}} className="ui buttons">
                        <button onClick={() => {props.AddTodo(todos);el.confirmed = true;setFlag(prev => !prev);}} className={`ui ${el.confirmed === false ? "" : "positive"} button`}>{`${el.confirmed === false ? "\u2713" : "Confirmed"}`}</button>
                        <div className="or"></div>
                        <button onClick={() => props.DeleteTodo(todos, el)} className="ui negative button">Delete</button>
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

const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps, {AddTodo, GetTodo, DeleteTodo})(MyList);