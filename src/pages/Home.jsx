import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import { sortTypes } from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/Skeleton/Skeleton";
import Pagination from "../components/Pagination/Pagination";

import { setFilter } from "../app/slices/filterSlice";
import { fetchPizzas } from "../app/slices/pizzaSlice";

const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);
  const sortType = sort.sortProperty;
  const sortOrder = sort.order;

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({ category, search, currentPage, sortType, sortOrder })
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      // TODO: change window.location to useSearchParams dom hook
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

      isSearch.current = true;
    }
  }, []);

  // FIXME: no fetch on reload with initial parameters with params in URL

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
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
        {status === "error" ? (
          <div className="content__error-info">
            <h1>Произошла ошибка 😕</h1>
            <p>Попробуйте обновить страницу</p>
          </div>
        ) : (
          <>
            <h1 className="content__title">Все пиццы</h1>
            <div className="content__items">
              {status === "loading" ? skeletons : pizzas}
            </div>
          </>
        )}
        <Pagination />
      </div>
    </>
  );
};

export default Home;
