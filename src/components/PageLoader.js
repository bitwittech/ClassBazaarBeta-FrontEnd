import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Oval} from 'react-loader-spinner'
import '../styles/Hamburgur.css'
import LOGO_PNG from '../assets/img/logo.png';



const Loading = () => {
    const styleIMG = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRaduis: "10%" };
    return (
        <>
        <div className= "containerLoader">
        <div className='imgContainer zoom-in-out-box ' ><img src= {LOGO_PNG} width= '150px' alt="" srcset="" /></div>
            <Oval
                color="#f15a30"
                strokeWidth='1'
                strokeWidthSecondary='1'
                secondaryColor='#ffd9dc5e'
                height={150}
                width={150}
                align = 'center'
                timeout={5000} //3 secs
   
            />
        </div>
        </>
    )
}

export default Loading