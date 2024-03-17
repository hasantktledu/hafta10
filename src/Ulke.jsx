function Ulke({ulkeVeri}) {


    return (
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="border rounded-3 p-3 d-flex align-items-center h-100 flex-column justify-content-center">
                    <h3 className="">{ulkeVeri.name.common}</h3>

                    <div className="flex-grow-1 d-flex align-items-center">
                        <img className="img-fluid" src={ulkeVeri.flags.png} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ulke