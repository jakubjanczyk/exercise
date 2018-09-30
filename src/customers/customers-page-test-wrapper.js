export const wrapperForCustomersPage = (component) => {
  const typeFilterText = (value) => component.findByDataTest('filter-box-input').simulate('change', { target: { value } });

  return {
    typeFilterText
  };
};
