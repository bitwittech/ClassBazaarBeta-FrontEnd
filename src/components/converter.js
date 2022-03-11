import React,{useEffect,useState} from 'react'
import axios from "axios";


function Converter(props)
{
    const [price,setPrice] = useState()
        
    const data = () => {
  
        
        let  url = `https://api.currencyapi.com/v3/latest?apikey=45f68830-84f3-11ec-8258-811245eebca2&base_currency=${props.currency}`;
        axios.get(url).then((response)=>{

            let p = props.price * response.data.data.INR.value;
            p = Math.round(p)
            setPrice(p)
        })
};


    return(
        <>
        {data()}
        {price}
        </>
    )

}

export default Converter;
