import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
    InputAdornment,
    OutlinedInput,
} from "@mui/material";
import React from "react";
import Iconify from "../../components/iconify";

TextInputSearch.propTypes = {
    filterName: PropTypes.string.isRequired,
    onFilterName: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

const StyledSearch = styled(OutlinedInput)(({ theme }: any) => ({
    width: "80%",
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '& input': {
        color: '#212b36c9',
    },
    "&.Mui-focused": {
      width: "90%",
      boxShadow: theme.customShadows.z8,
    },
    "& fieldset": {
      borderWidth: `1px !important`,
      borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

function TextInputSearch({
    filterName,
    onFilterName,
    placeholder,
}: PropTypes.InferProps<typeof TextInputSearch.propTypes>){
    return(
        <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder={placeholder}
            size="small"
            startAdornment={
                <InputAdornment position="start">
                    <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                </InputAdornment>
            }
        />
    )
}
export default TextInputSearch;