import { useEffect, useState } from "react"

function C1({sayac, setSayac}) {
    
    useEffect( ()=>{ 
        console.log("C1 render oldu");
     } , [sayac] )

    return (
        <>
            <div className="bg-success-subtle p-3">
                Ben C1 komponentiyim..

                <button onClick={ ()=>{ setSayac(eskiDeger=>eskiDeger+1) } } className="btn btn-outline-danger">{sayac}</button>
            </div>
        </>
    )
}

export default C1