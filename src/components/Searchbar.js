import React, { useState } from "react";
import "../styles/SearchBar.css";
import coursedata from './searchData/data.json';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';
import {TextField,InputAdornment} from '@material-ui/core'
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord.length < 4) {
      setFilteredData([])
      return 0
    } ;
console.log(coursedata)
    const newFilter = coursedata.data.filter((value)=>{
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    })
    
    // for fetching the data
    // const newFilter = await axios.get(`http://0.0.0.0:8080/api/createSearchOBJ?search=${searchWord}`)
    // .then((res)=>res.data.data)
    // .catch((err)=>{ 

    //     console.log(err)
    //     setFilteredData([]);
    // })

    console.log(newFilter)
    
    
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="searchBox">
      <div className="input" >
        <TextField
        size = {'small'}
         className="s-input"
         type="text"
         color = 'white'
          placeholder= 'Search for courses...'
          value={wordEntered}
          onChange={handleFilter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0,Math.floor(Math.random() * filteredData.length)).map((value, key) => {
            return (
              <p key = {key} className="dataItem" onClick = {(e)=>{ console.log(e.target.innerText); setWordEntered(e.target.innerText)   }} >
                {value.title} </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
