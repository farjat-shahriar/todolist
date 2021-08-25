import React, { useState,useEffect } from 'react';
import "./style.css";

// get the localdata
const getLocalData =()=>{
    const lists = localStorage.getItem("mytodolist")
    if (lists){
        return JSON.parse(lists);
    }
    else{
        return[];
    }
}

const Todo = () => {
    const [inputdata, setInputdata] = useState();
    const [items, setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("")
    const [togglebtn,settogglebtn] = useState(false);
    // ad the item function
    const additem = () => {
        if (!inputdata) {
            alert("plz fill the data");
        }

        else if (inputdata && togglebtn){
            setItems(
                items.map((curElem)=>{
                 
                    if(curElem.id == isEditItem){
                    return{...curElem, name : inputdata}
            
                    }
                    return curElem;
                })
            )

        }
        else {

            const myNewInputData ={
                id:new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData])
            setInputdata("");
        }
    }


    //edit item
    const editItem =(index)=>{

    const  item_todo_edited = items.find((curElem)=>{
        return curElem.id == index;

    })
     
    setInputdata (item_todo_edited.name)
    setIsEditItem(index)
    settogglebtn(true);
    
    }
//   how to delete items
    const deleteItem=(index)=>{

          const updatedItem = items.filter((curElem)=>{

          return curElem.id != index;

          })
          setItems(updatedItem);


    }

    // remove all the element
    const removeAll=()=>{
        setItems([]);

    }
    // adding local stroage
    useEffect(() => {
       
      localStorage.setItem("mytodolist", JSON.stringify(items))



    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption> Add your List</figcaption>
                    </figure>
                    <div className="addItems">

                        <input type="text" placeholder="Add item"
                            className="form-control"

                            value={inputdata}
                            onChange={(event) => setInputdata(event.target.value)}


                        />
                        {togglebtn ?  ( <i className="far fa-edit add-btn" onClick={additem}></i>)
: (  <i className="fa fa-plus add-btn" onClick={additem}></i>)}

                      
                    </div>
                    {/* show our items */}
                    <div className="showItems">

                        {
                            items.map((curElem) => {

                                return (
                                    <div className="eachItem" key={curElem.id}>

                                        <h3>{curElem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn"
                                            
                                            onClick={()=>editItem(curElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn"
                                            
                                            onClick={()=> deleteItem(curElem.id)}
                                            
                                            ></i>

                                        </div>



                                    </div>

                                )

                            })
                        }

                    </div>
                    {/* remove all */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove all"
                        onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo
