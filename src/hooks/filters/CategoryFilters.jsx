import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import createTheme from '../../theme';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
  margin: '0 10px',
  backgroundColor: createTheme.palette.common.marketwhite,
});

const CategoryFilter = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onSelectCategory(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Toys">Toys</MenuItem>
        <MenuItem value="Household Items">Household Items</MenuItem>
        <MenuItem value="Gadgets">Gadgets</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default CategoryFilter;
