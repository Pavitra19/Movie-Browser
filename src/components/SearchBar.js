import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar() {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}
