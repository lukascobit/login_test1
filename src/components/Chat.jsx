import React, { useEffect, useState } from 'react'

function Chat(auth) {
    auth = auth.auth

    const anonPfp = "https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png"
    
    const [data, setData] = useState()
    const [body, setBody] = useState("")
    const username = auth.currentUser.displayName
    const pfp_url = auth.currentUser.photoURL
    useEffect(()=>{
        async function getTodos(){
            try {
                const response = await fetch("http://localhost:4001/posts");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.log(error);
            }
        }
        getTodos()
    },[])

     
    async function handleSubmit(e){
        e.preventDefault()
        try {
            const Rbody = {body}
            const Rname = {username}
            
            const Rpfp = {pfp_url}
            const arr = [Rbody, Rname, Rpfp]
            const response = await fetch("http://localhost:4001/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(arr)
            });
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)} className="inputDiv">
                <textarea onChange={(e)=>setBody(e.target.value)} value={body} placeholder="share your message..." className="textarea" name="body" id=""/>
                <button className="send">send</button>
            </form>
            <div className="posts">
                {data && data.map((d)=>{
                    return(
                        <div key={d.id} className="post">
                            <h1><img className="pfp" src={d.pfp_url || anonPfp} alt=""/>{` ${d.username}`}</h1>
                            <h3>{d.body}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Chat
