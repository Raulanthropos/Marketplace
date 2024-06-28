import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import createTheme from '../../theme';
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
  margin: "0 10px",
  backgroundColor: createTheme.palette.common.marketwhite,
});

const SortOptions = ({ onSelectSort }) => {
  const handleSortChange = (event) => {
    onSelectSort(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel>Sort by</InputLabel>
      <Select onChange={handleSortChange}>
        <MenuItem value="">Reset</MenuItem>
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default SortOptions;
