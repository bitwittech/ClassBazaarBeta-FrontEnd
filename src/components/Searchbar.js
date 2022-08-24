import React, { useState } from "react";
import {  withRouter } from 'react-router-dom';
import "../styles/SearchBar.css";
import coursedata from './searchData/data.json';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';
import {TextField,InputAdornment} from '@material-ui/core'
function SearchBar(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  
  const handleFilter = async (event) => {
    console.log(event.target.value,event.target.innerText)

    const searchWord = event.target.value === undefined ? event.target.innerText : event.target.value; 
    setWordEntered(searchWord);

    event.target.value =searchWord 

    if (searchWord.length < 4) {
      setFilteredData([]);
      return 0;
    }
    console.log(coursedata);
    const newFilter = coursedata.data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    // for fetching the data
    // const newFilter = await axios.get(`http://0.0.0.0:8080/api/createSearchOBJ?search=${searchWord}`)
    // .then((res)=>res.data.data)
    // .catch((err)=>{

    //     console.log(err)
    //     setFilteredData([]);
    // })


    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

    return props.onChange(event);

  };


  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="searchBox">
      <div className="input" >
        <TextField
        size = {'large'}
         className="s-input search-bar"
         type="text"
         fullWidth
         color = 'primary'
         variant ='outlined'
          placeholder= 'Search for courses...'
          value={wordEntered}
          onChange={handleFilter}
          onKeyPress={props.onKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon ></SearchIcon>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0,Math.floor(Math.random() * filteredData.length)).map((value, key) => {
            return (
              <p key = {key} className="dataItem" onClick = {handleFilter} >
                {value.title} </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default withRouter(SearchBar);
