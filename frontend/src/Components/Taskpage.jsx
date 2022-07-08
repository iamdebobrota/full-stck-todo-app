import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import '../App.css'

const Taskpage = () => {
    const navigate = useNavigate();
    const userid = JSON.parse(localStorage.getItem("userid"))
    const [data, setData] = useState([])
    const [task, setTask] = useState({})
const [edit, setEdit] = useState(false)
const [tedit, settEdit] = useState('')
const [ed, setEd]=useState('')


    useEffect(() => {
        if(!userid){
            navigate("/login")
        }
        getData();
    }, [userid])
   
    const getData = () => {
        fetch(`https://unit5c2eval.herokuapp.com/user/${userid}/tasks`)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
        .catch((err) => console.log(err))
    }
    

    const handleChange = (e) => {
        let {name, value} = e.target
        setTask( {
            ...task,
            [name] : value
        })
    }

    const handleSubmit = () => {
        let payload = JSON.stringify(task)
        fetch(`https://unit5c2eval.herokuapp.com/user/${userid}/tasks`, {
            headers : {
                "Content-Type" : "application/json"
            },
            method : 'POST',
            body : payload
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            getData();
        })
        .catch((err) => console.log(err))
    }

    const handleDelete= async(id)=>{
        const newTodo=data.filter((todo)=>todo._id!==id)
        setData(newTodo)
        getData()
        console.log(newTodo);
    
         await fetch(`https://unit5c2eval.herokuapp.com/user/${userid}/tasks/${id}`,{
            method: 'DELETE',
            headers: {"content-type" : "application/json" },
        })
        .then(response => response.json())
        .then(res=>{
            getData()
            console.log(res);
        })
        .catch(err=>console.log(err))
    
    
        
    }



    const handleEdit= (id)=>{
            setEdit(true)
            settEdit(id)



// let payload = JSON.stringify(task)

        // const newTodo=data.map((todo)=>(todo._id===id?
        //     (todo.note=task.note):
        //     ))
        //     console.log("")
        // setData(newTodo)
        // getData()
        // console.log(task);

        // editData(id)

    }
    const editData= async(id)=>{
        const payload= JSON.stringify(ed)
    
            fetch(`https://unit5c2eval.herokuapp.com/user/${userid}/tasks/${id}`, {
                headers : {
                    "Content-Type" : "application/json"
                },
                method : 'PUT',
                body :  payload
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                getData();
                // setEdit(false)
            })
            .catch((err) => console.log(err))
        
    // console.log(ed.note);
    
    // setEdit(false)
        }
const handleEdit2=(id)=>{
    editData(id)
    setEdit(false)
    setEd('')
}
    // useEffect((id)=>{
    //     // editData(id)
        
    // },[edit])
   

const handleChange2=(e)=>{
    let {name, value} = e.target
    setEd( {
        ...task,
        [name] : value
    })
}

    return <div>
        <h1>Notes page</h1> 
        <div>
            <input type="text" name="title" placeholder="title" onChange={handleChange}/>
            <br />

            <input type="text" name='note' placeholder='Notes' onChange={handleChange}/>
        <br />
        <input type="text" name='label'  placeholder='label' onChange={handleChange}/>
        <br />
        <br />


            <button type="submit" onClick={handleSubmit}>ADD NOTES</button>
            <hr/>
            <div>
                {
                    data && data.length > 0 && data.map((itm) => {
                        return <div key={itm._id} className='todo'>
                            <h3>{itm.note}</h3>
                            <button onClick={()=>handleDelete(itm._id)}>Delete</button>
                            {
                                edit && (tedit===itm._id)?
                                <button onClick={()=>handleEdit2(itm._id)}>Update </button> :
                                <button onClick={()=>handleEdit(itm._id)}>Edit </button> 
                            }
{/* <button onClick={()=>handleEdit(itm._id)}> {edit && (tedit===itm._id)? "Update" : "Edit"}</button> */}
                            
{
    edit && (tedit===itm._id)? (
        <input type="text" name='note' 
        onChange={handleChange2} placeholder='update something..' />
    ): (
        <div></div>
    )
}

                            </div>
                    })
                }
            </div>
        </div>
    </div>
}

export {Taskpage}