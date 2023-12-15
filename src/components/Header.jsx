import classes from "./Header.module.css";
import { useState } from "react";

function Header(props) {
  // Contains original payload from API
  const payload = props.data;
  const [filteredUsers, setFilteredUsers] = useState(payload);
  let value = null;

  // OnChange event for search bar
  const handleFilter = (event) => {
    // Input value
    value = event.target.value;

    // Search brand, description, title, & category
    const filterBrand = payload.filter((user) => user.brand.toLowerCase().includes(value));
    const filterDescription = payload.filter((user) => user.description.toLowerCase().includes(value));
    const filterTitle = payload.filter((user) => user.title.toLowerCase().includes(value));
    const filterCategory = payload.filter((user) => user.category.toLowerCase().includes(value));
    const arrays = [...filterBrand, ...filterDescription, ...filterTitle, ...filterCategory];

    // Merge all to one array
    const removeDuplicates = arrays.filter(function (item, pos) {
      return arrays.indexOf(item) == pos;
    });

    // Return new array after 3 characters
    if (value.length > 3) {
      setFilteredUsers(removeDuplicates);
      props.populateTable(filteredUsers);
    } else {
      resetInput();
    }
  };

  // Reset to empty string and replace refined array with local storage array
  const resetInput = () => {
    value = "";
    let retString = localStorage.getItem("jsonData");
    let arr = JSON.parse(retString);
    props.populateTable(arr);
  };

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <h1>Data Table</h1>
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
