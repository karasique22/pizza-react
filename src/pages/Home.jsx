import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/Skeleton/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../app/slices/filterSlice";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
    order: "desc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sortProperty = sortType.sortProperty;
    const order = sortType.order;

    setIsLoading(true);
    fetch(
      `https://6537fe50a543859d1bb11d97.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortProperty}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
          <Sort value={sortType} onChangeSort={(type) => setSortType(type)} />
        </div>
        <h1 className="content__title">Все пиццы</h1>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
};

export default Home;
