import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { productListType } from "./Interface";

import Grid from "@mui/material/Grid";
import { Filters } from "./Filters";
import { Chart } from "./Chart";

function App() {
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [product, setProduct] = useState<string[]>([]);
  const [productList, setProductList] = useState<productListType[]>([]);
  const [chartNameCount, setChartNameCount] = useState<
    { name: string; y: number }[]
  >([]);
  const [columnChartData, setColumnChartData] = useState({});

  useEffect(() => {
    const getAllProduct = async () => {
      var response = await axios.get("https://dummyjson.com/products");
      var product = response.data.products;
      var chartNameValue: { name: string; y: number }[] = [];
      for (var proVal of product) {
        var chartNameValueIdx = chartNameValue.findIndex(
          (item: { name: string; y: number }) => item.name === proVal.category
        );
        if (chartNameValueIdx !== -1) {
          chartNameValue[chartNameValueIdx].y =
            chartNameValue[chartNameValueIdx].y + 1;
        } else {
          chartNameValue[chartNameValue.length] = {
            name: proVal.category,
            y: 1,
          };
        }
      }
      setChartNameCount(chartNameValue);
    };
    getAllProduct();
  }, []);
  useEffect(() => {
    const getCategory = async () => {
      var response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategoryList(response.data);
    };
    getCategory();
  }, []);
  useEffect(() => {
    const getProduct = async () => {
      try {
        var response = await axios.get(
          "https://dummyjson.com/products/category/" + category
        );
        setProductList(response.data.products);
      } catch {
        setProductList([]);
      }
    };
    if (category) getProduct();
    else setProductList([]);
  }, [category]);

  const handleRunReport = () => {
    var filterProductList = [...productList];

    if (product.length) {
      filterProductList = productList.filter(
        (item) => product.indexOf(item.title) !== -1
      );
    }
    var title: string[] = [];
    var price: number[] = [];
    var category = "";
    filterProductList.forEach((item) => {
      title.push(item.title);
      price.push(item.price);
      category = item.category;
    });
    setColumnChartData({ title, price, category });
  };
  const handleClear = () => {
    setCategory("");
    setColumnChartData({});
  };
  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
    setProduct([]);
  };
  const handleProductChange = (event: any) => {
    setProduct(event.target.value);
  };
  return (
    <div className="App">
      <Grid container spacing={2} sx={{ m: 1 }}>
        <Grid item xs={2}>
          <Filters
            handleClear={handleClear}
            handleRunReport={handleRunReport}
            handleCategoryChange={handleCategoryChange}
            handleProductChange={handleProductChange}
            category={category}
            categoryList={categoryList}
            product={product}
            productList={productList}
          />
        </Grid>
        <Grid item xs={10}>
          <Chart
            chartNameCount={chartNameCount}
            columnChartData={columnChartData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
