import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "contexts/Main";
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Chiped = styled(Chip)`
  margin-bottom: 7px;
  ${({ label }) => label == 'poison' && `
    background: #a040a0;
  `}
  ${({ label }) => label == 'normal' && `
  background: #a8a878;
  `}
  ${({ label }) => label == 'fire' && `
  background: #f08030;
  `}
  ${({ label }) => label == 'water' && `
  background: #6890f0;
  `}
  ${({ label }) => label == 'grass' && `
  background: #78c850;
  `}
  ${({ label }) => label == 'electric' && `
  background: #f8d030;
  `}
  ${({ label }) => label == 'ice' && `
  background: #98d8d8;
  `}
  ${({ label }) => label == 'fighting' && `
  background: #c03129;
  `}
  ${({ label }) => label == 'ground' && `
  background: #e0c068;
  `}
  ${({ label }) => label == 'flying' && `
  background: #a890f0;
  `}
  ${({ label }) => label == 'psychic' && `
  background: #f85888;
  `}
  ${({ label }) => label == 'bug' && `
  background: #a8b820;
  `}
  ${({ label }) => label == 'rock' && `
  background: #b8a038;
  `}
  ${({ label }) => label == 'ghost' && `
  background: #705898;
  `}
  ${({ label }) => label == 'dragon' && `
  background: #7038f8;
  `}
  ${({ label }) => label == 'dark' && `
  background: #705848;
  `}
  ${({ label }) => label == 'steel' && `
  background: #b8b8d0;
  `}
  ${({ label }) => label == 'fairy' && `
  background: #ee99ac;
  `}
`;

export const PSelect = ({}) => {
  const [type, setType] = useState([]);
  const { handleFiltredList } = useFilter();

  const getType = () => {
    return fetch(`https://pokeapi.co/api/v2/type`).then((res) => res.json())
}

  const { isLoading, data, error } = useQuery(['pokeType'], getType);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleFiltredList(event)
  };

  if (isLoading) return "Loading";

  if (error) return "Error";

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel color='warning' id="demo-multiple-chip-label">Type</InputLabel>
        <Select
          color='warning'
          value={type}
          name='type'
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Type" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: '25px', overflow: 'scroll' }}>
              {selected.map((value) => (
                // <span className={'bg-'+value} key={value}>{value}</span>
                <Chiped key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.results.slice(0, 18).map((type) => (
            <MenuItem
              key={type.name}
              value={type.name}
            >
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}