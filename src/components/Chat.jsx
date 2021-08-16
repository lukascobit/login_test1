import React, { useEffect, useState } from 'react'

function Chat() {
    const anonPfp = "https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_120dp.png"
    
    const [data, setData] = useState()
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

    return (
        <div>
            <div className="inputDiv">
                <textarea name="body" id="" cols="30" rows="10"/>
            </div>
            <div className="posts">
                {data && data.map((d)=>{
                    console.log(d);
                    return(
                        <div className="post">
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
