import { useState } from "react";
import C1 from "./C1";

function App() {
  const [c1Kapali, c1AcKapa] = useState(false)

  return (
    <>
      <div className="container my-5">
        <button className="btn btn-success" onClick={ ()=>{ c1AcKapa(eskiDeger=>!eskiDeger) } }>C1 Aç/Kapa</button>
        {!c1Kapali && <C1 />}
      </div>
    </>
  );
}

export default App;
