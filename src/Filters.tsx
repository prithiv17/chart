import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { filtersProps } from "./Interface";
import { productListType } from "./Interface";

import "./Filters.css";
export const Filters = ({
  handleClear,
  handleRunReport,
  handleCategoryChange,
  handleProductChange,
  category,
  categoryList,
  product,
  productList,
}: filtersProps) => {
  return (
    <>
      <div className="filters-container">
        <span className="filters-header">Filters</span>
        <span className="filters-clear">
          <Button variant="text" onClick={handleClear}>
            Clear
          </Button>
        </span>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="category"
            onChange={handleCategoryChange}
          >
            {categoryList.map((item: string, idx) => (
              <MenuItem value={item} key={idx}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 5 }}>
          <InputLabel id="product-select-label">Product</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            label="product"
            onChange={handleProductChange}
            disabled={!category}
            multiple={true}
            value={product}
          >
            {productList.map((item: productListType, idx) => (
              <MenuItem value={item.title} key={idx}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ mt: 10 }}
          variant="contained"
          onClick={handleRunReport}
          disabled={!category}
        >
          Run Report
        </Button>
      </div>
    </>
  );
};
