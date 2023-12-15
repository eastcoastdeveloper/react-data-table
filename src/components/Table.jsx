import { useEffect, useState, useRef } from "react";
import classes from "./Table.module.css";
import Error from "./Error";
import Header from "./Header";

function Table() {
  const [payload, populateTable] = useState({});
  const [defaultRow, showHiddenRow] = useState();

  const totalItems = useRef(0);
  const initialValue = 0;
  const rowReference = useRef(initialValue);

  // Toggle Row
  const toggleClass = (e) => {
    const index = parseInt(e.target.attributes[0].value);
    index === rowReference.current ? (rowReference.current = null) : (rowReference.current = index);
    showHiddenRow(!defaultRow);
  };

  useEffect(() => {
    // Fetch API
    async function getData() {
      try {
        await fetch("https://dummyjson.com/products")
          .then((response) => response.json())
          .then((data) => {
            populateTable(data.products);
            totalItems.current = data.total;

            // Cache payload in local storage
            const masterArray = JSON.stringify(data.products);
            localStorage.setItem("jsonData", masterArray);
          });
      } catch (error) {
        console.log("%c Something terrible has happened. Oh my goodness!", "background: rgb(255,15,15); color: #ffffff");
        return <Error />;
      }
    }
    if (!payload.length > 0) {
      getData();
    }
  }, [payload]);

  // Table header names
  const columns = [
    { label: "ID", reference: "id" },
    { label: "Brand", reference: "brand" },
    { label: "Rating", reference: "rating" },
    { label: "Price", reference: "price" },
    { label: "Title", reference: "title" },
    { label: "Stock", reference: "stock" },
    { label: "Category", reference: "category" },
  ];

  // Format currency (price column)
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return payload.length > 0 ? (
    <>
      <div className={classes.wrapper}>
        {/* Header component (contains search) */}
        <Header data={payload} populateTable={populateTable} />

        {/* Table header loops over columns array */}
        <div className={`${classes.tableRow} ${classes.tableHeader}`}>
          <span className={classes.showAll}></span>
          {columns.map(({ label, reference }) => {
            return <span key={reference}>{label}</span>;
          })}
        </div>

        {/* Table body */}
        <div className={classes.tableBody}>
          {/* API payload populates rows */}
          {payload.map((item) => (
            <div className={classes.tableRow} key={item.id}>
              <div className={classes.default}>
                <span
                  id={item.id}
                  onClick={toggleClass}
                  className={rowReference.current === item.id ? `${classes.rotateCaret}` : `${classes.defaultCaret}`}
                >
                  &#x25B6;
                </span>
                <span className={classes.cell}>{item.id}</span>
                <span className={classes.cell}>{item.brand}</span>
                <span className={classes.cell}>{item.rating}</span>

                {/* Format price */}
                <span className={classes.cell}>{USDollar.format(item.price)}</span>

                {/* Trim title */}
                <span className={classes.cell}>{item.title.length > 25 ? item.title.slice(0, 27) + "..." : item.title}</span>
                <span className={classes.cell}>{item.stock}</span>

                {/* Trim category */}
                <span className={classes.cell}>{item.category.length > 8 ? item.category.slice(0, 5) + "..." : item.category}</span>
              </div>

              {/* Hidden row */}
              <div className={rowReference.current === item.id ? `${classes.showRow}` : `${classes.hideRow}`}>
                <div className={classes.imageWrapper}>
                  <p>{item.description}</p>
                  <div>
                    <img src={item.images[0]} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table footer */}
        <footer className={classes.tableFooter}>
          <span>{payload.length} items</span>
        </footer>
      </div>
    </>
  ) : (
    // Loader
    <div className={classes.loader}>
      <span>Loading...</span>
    </div>
  );
}

export default Table;
