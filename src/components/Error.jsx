import classes from "./Error.module.css";

function Error() {
  return (
    <div className={classes.errorBG}>
      <div className={classes.warning}>Something went wrong</div>
    </div>
  );
}

export default Error;
