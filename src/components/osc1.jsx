import React from "react";


const Osc1 = ({changeFreq, changeVol}) => {

return(
    <div>
<input type='range' id="frequency" onChange={changeFreq} max="5000"/>
<input type='range' id="gain" onChange={changeVol} min="0.0001" max="100"/>
    </div>
)

}

export default Osc1;