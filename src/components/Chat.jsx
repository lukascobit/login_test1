import React, { useEffect, useState } from 'react'
import {MdDelete} from "react-icons/md"
import firebase from 'firebase/app'
import "firebase/storage"

function Chat(auth, anon) {
    auth = auth.auth

    const anonPfp = "https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png"
    
    const [data, setData] = useState()
    const [body, setBody] = useState("")
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState("")
    const username = auth.currentUser.displayName
    const pfp_url =  auth.currentUser.photoURL
    const storage = firebase.storage()
    useEffect(()=>{
        async function getTodos(){
            try {
                const response = await fetch("http://localhost:4001/posts");
                const jsonData = await response.json();
                setData(jsonData.reverse());
            } catch (error) {
                console.log(error);
            }
        }
        getTodos()
    },[])

     
    async function handleSubmit(e){
        e.preventDefault()
        if(file){
            
            const upladTask = storage.ref(`images/${file.name}`).put(file);
            upladTask.on("state changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        setFileUrl(url);
                    })
            }
            )
        }
        try {
           
            const Rbody = {body}
            const Rname = {username}
            
            if(fileUrl){
                const Rurl = {fileUrl}
                console.log(Rurl);
                console.log(Rname);
                const Rpfp = {pfp_url}
                const arr = [Rbody, Rname, Rpfp, Rurl]
                const response = await fetch("http://localhost:4001/posts", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(arr)
                });
                //window.location.reload()
            }else{
                const Rurl = {fileUrl: null}
                const Rpfp = {pfp_url}
                const arr = [Rbody, Rname, Rpfp, Rurl]
                const response = await fetch("http://localhost:4001/posts", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(arr)
                });
                console.log("fail");
            }

            
        
        } catch (error) {
            console.log(error);
        }
    }
    async function deletePost(id ){
        try {
            const response = await fetch(`http://localhost:4001/posts/${id}`,{
                method: "DELETE"
            })
            setData(data.filter(todo => todo.id !== id))
  
        } catch (error) {
            console.log(error);
        }
    }
    function pickFile(e){
        setFile(e.target.files[0]);
    }
    
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="inputDiv">
                <textarea autoFocus onChange={(e)=>setBody(e.target.value)} value={body} placeholder="share your message..." className="textarea" name="body" id=""/>
                <button className="send">send</button>
                <input type="file" onChange={e=>pickFile(e)} />
            </form>
            <div className="posts">
                {data && data.map((d)=>{
                    console.log(d.url)
                    return(
                        <div key={d.id} className="post">
                            <h1>
                                <img className="pfp" src={d.pfp_url || anonPfp} alt=""/>
                                {` ${d.username}`}
                                <MdDelete onClick={()=>deletePost(d.id)} className={d.username === username ? "trashCan" : "no"}/>
                                </h1>
                                <h1>{d.url}</h1>

                            <h3 className="message">{d.body}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Chat
