import "./SearchProduct.scss";

type SearchProductProps = {
  handleSearch: (event: React.SyntheticEvent)=>void
}
const SearchProduct:React.FC<SearchProductProps> = ({handleSearch}) => {

  return (
    <form className="search">
      <input
        type="search"
        placeholder="Search by name or category"
        className="search__input"
        onChange={handleSearch}
      />
    </form>
  );
};
export default SearchProduct;