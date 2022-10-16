import { useFilter } from "contexts/Main";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { PSelect } from "../stories/components/select/PSelect";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";

const SearchBar = ({}) => {
    const [search, setSearch] = useState('');
    const { handleChange, handleFiltredList, filteredList } = useFilter();

    return (
        <>
            <TextField
                sx={{ marginLeft: 5 }}
                color="warning"
                label="Search pokemon"
                type="text"
                onChange={handleChange} />
            <IconButton onClick={() => {handleChange(search)}} sx={{ marginRight: 10 }} color="primary" aria-label="search button" size="large" component="label">
                <SearchIcon fontSize="inherit" sx={{ color: 'orange' }}/>
            </IconButton>
            <TextField
                sx={{ marginLeft: 2, width: 120 }}
                id="outlined-number"
                color="warning"
                label="Limit per page"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                name="limit"
                value={filteredList.limit}
                onChange={handleFiltredList} />
            <PSelect />
        </>
    );
} 

export default SearchBar;