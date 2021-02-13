import React, { useState, useEffect } from 'react';
import Autocomplete from "react-autocomplete";

export default function Dropsearch() {
    <Autocomplete
        getItemValue={(item) => item.label}
        items={searchList}
        renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>
        }
        value={""}
        onChange={(e) => {
            setSearchInput(e.target.value)
            return value = e.target.value
        }}

        onSelect={(val) => {
            console.log(val)
            return value = val
        }}
    />
}