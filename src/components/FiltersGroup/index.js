import "./index.css";

const FiltersGroup = (props) => {
  const renderCategoriesList = () => {
    const { categoryOptions } = props;

    return categoryOptions.map((category) => {
      const { changeCategory, activeCategoryId } = props;
      const onClickCategoryItem = () => changeCategory(category.categoryId);
      const isActive = category.categoryId === activeCategoryId;
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`;

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      );
    });
  };

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  );

  return (
    <div className="filters-group-container">{renderProductCategories()}</div>
  );
};

export default FiltersGroup;
