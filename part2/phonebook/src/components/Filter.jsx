
function Filter(props) {
  return (
    <div>
      filter shown with <input value={props.search} onChange={props.handleFilterChange} />
    </div>
  );
}

export default Filter;
