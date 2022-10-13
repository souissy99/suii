import { useFilter } from "contexts/Main";
import TextField from '@mui/material/TextField';
import { PSelect } from "../stories/components/select/PSelect";

const SearchBar = ({}) => {
    const { handleChange, handleFiltredList, filteredList } = useFilter();

    return (
        <>
            <TextField
                color="warning"
                label="Search pokemon"
                type="text"
                onChange={handleChange} />
            <TextField
                sx={{ marginLeft: 2, width: 120 }}
                id="outlined-number"
                color="warning"
                label="Limit per page"
                type="number"
                name="limit"
                onChange={handleFiltredList} />
            <PSelect />
        </>
    );
} 

export default SearchBar;