import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import { sortTypes } from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/Skeleton/Skeleton";
import Pagination from "../components/Pagination/Pagination";

import { SearchContext } from "../App";
import { setFilter } from "../app/slices/filterSlice";

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;
  const sortOrder = sort.order;

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sortType,
        order: sortOrder,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const fetchPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    setIsLoading(true);

    try {
      const res = await axios.get(
        `https://6537fe50a543859d1bb11d97.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortType}&order=${sortOrder}`
      );
      setItems(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilter({
          ...params,
          sort,
        })
      );

      if (categoryId == 0) {
        isSearch.current = false;
      } else {
        isSearch.current = true;
      }
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, sortOrder, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h1 className="content__title">Все пиццы</h1>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;
