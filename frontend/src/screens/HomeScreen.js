import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function HomeScreen() {
  // state ile inputBox ve filtered array verilerini tanımlama
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState(null);


  // veritabanındaki product'a ulaşmak (redux) state'i kullanarak

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // listProducts fonksiyonunu çalıştırmak
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, filtered]);

  // arama buttonu
  const handleFilter = () => {
    setFiltered([]);
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.toLowerCase().includes(name.toLowerCase()))
        setFiltered((before) => [...before, products[i]]);
    }
  };
  // en düşük fiyata göre sırala
  const handleDesc = () => {
    setFiltered([]);
    setFiltered(
      products.sort((a, b) => {
        return a.price - b.price;
      })
    );
  };
  // en yüksek fiyata göre sırala
  const handleAsc = () => {
    setFiltered([]);
    setFiltered(
      products
        .sort((a, b) => {
          return a.price - b.price;
        })
        .reverse()
    );
  };
  // yıldıza göre sıralama
  const handleStars = () => {
    setFiltered([]);
    setFiltered(
      products
        .sort((a, b) => {
          return a.rating - b.rating;
        })
        .reverse()
    );
  };
  // view'a göre sıralama
  const handleViews = () => {
    setFiltered([]);
    setFiltered(
      products
        .sort((a, b) => {
          return a.numReviews - b.numReviews;
        })
        .reverse()
    );
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="filters">
            <div className="cart filter-card">
              <div className="filter-container">
                <div className="filter-text">
                  <br />
                  <br />
                  <br />
                </div>
                <button
                  className="sorts primary"
                  onClick={() => {
                    handleViews();
                  }}
                >
                  Sort By Views
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleStars();
                  }}
                >
                  Sort By Stars
                </button>
              </div>
            </div>

            <div className="cart filter-card">
              <div className="filter-container">
                <div className="filter-text">
                  <br />
                  <br />
                  <br />
                </div>
                <button
                  className="sorts primary"
                  onClick={() => {
                    handleDesc();
                  }}
                >
                  Sort By Desc
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleAsc();
                  }}
                >
                  Sort By Asc
                </button>
              </div>
            </div>

            <div className="cart filter-card">
              <div className="filter-container">
                <div className="filter-text">
                  <br />
                  <br />
                  <br />
                </div>
                <div>
                  <input
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <button
                    className="primary"
                    onClick={() => {
                      handleFilter();
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row center">
            {filtered
              ? filtered.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))
              : products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
          </div>
        </>
      )}
      <div className="cart filter-card">
        <div className="pages">
          <div>
            <p>
              Page: 1 <span id="pageNumber"></span>
            </p>
          </div>
          <div className="filter">
            <button id="prevPage" className="page-btn" disabled>
              <i className="fa fa-caret-square-o-left" aria-hidden="true"></i>
            </button>
            <button id="nextPage" className="page-btn">
              <i className="fa fa-caret-square-o-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
