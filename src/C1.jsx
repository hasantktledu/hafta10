import { useEffect, useState } from "react"

function C1() {
    const [sayac, setSayac] = useState(0)
    const [baglanti, setBaglanti] = useState(navigator.onLine)

    useEffect( ()=>{
        
        function pencereDegisti(event) {

            const yatayMi = (event.target.innerWidth / event.target.innerHeight) > 1 ? true : false
            console.log(yatayMi ? "Yatay ekran": "Dikey Ekran");

        }

        window.addEventListener("resize", pencereDegisti)

        return ()=> {
            window.removeEventListener("resize", pencereDegisti)
        }

    }, [])

    useEffect( ()=>{
        const surekliIslem = setInterval( ()=>{
            setBaglanti(navigator.onLine)
        } , 1000 )

        return ()=>{
            clearInterval(surekliIslem)
        }
    }, [] )

    return (
        <>
            <div className="p-3 m-3 bg-success-subtle">
                C1 Komponenti
                <button className="btn btn-outline-danger" onClick={ ()=>{ setSayac(eskiDeger=>eskiDeger+5) } }>{sayac}</button>
            </div>

            {
                !baglanti?
                <div className="alert alert-danger p-3 position-fixed">
                    Bağlantı kesildi!
                </div> : ""
            }
        </>
    )
}

export default C1