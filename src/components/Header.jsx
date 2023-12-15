import classes from "./Header.module.css";
import { useState } from "react";

function Header(props) {
  const payload = props.data;
  const [filteredUsers, setFilteredUsers] = useState(payload);
  let value = null;

  const handleFilter = (event) => {
    value = event.target.value;
    const filterBrand = payload.filter((user) => user.brand.toLowerCase().includes(value));
    const filterDescription = payload.filter((user) => user.description.toLowerCase().includes(value));
    const filterTitle = payload.filter((user) => user.title.toLowerCase().includes(value));
    const filterCategory = payload.filter((user) => user.category.toLowerCase().includes(value));
    const arrays = [...filterBrand, ...filterDescription, ...filterTitle, ...filterCategory];
    const removeDuplicates = arrays.filter(function (item, pos) {
      return arrays.indexOf(item) == pos;
    });

    if (value.length > 3) {
      setFilteredUsers(removeDuplicates);
      props.populateTable(filteredUsers);
    } else {
      resetInput();
    }
  };

  const resetInput = () => {
    value = "";
    let retString = localStorage.getItem("jsonData");
    let arr = JSON.parse(retString);
    props.populateTable(arr);
  };

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <h1>React Fetch & Search</h1>
        <div className={classes.search}>
          <input type="text" onChange={handleFilter} />
          <button type="button" onClick={resetInput}>
            &#x2715;
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
