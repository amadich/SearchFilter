"use client";

import { useState } from 'react'
import SearchContainer from './SearchContainer'

export default function SearchInput() {

   const [filter, setFilter] = useState('');

  return (
    <div id='myInputSearch'>
            <input 
               type="text" 
               id="filterInput"
               placeholder="Filter Your Data From API" 
               onChange={(e) => {setFilter(e.target.value)}}/>   

            <SearchContainer filter={filter} />
    </div>
  )
}
