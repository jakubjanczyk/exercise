export const wrapperForCustomersList = (component) => {
  const customersTable = () => component.findByDataTest('customers-list');
  const customersTableColumns = () => customersTable().find('.rt-th').map(el => el.text());
  const customersTableRowAt = (index) => customersTable().find('.rt-tbody .rt-tr').at(index).find('.rt-td')
    .map(el => el.text());
  const numberOfCustomerRows = () => customersTable().find('.rt-tbody .rt-tr').length;

  const clickOnColumnHeader = (column) => customersTable()
    .find('.rt-th')
    .findWhere((el) => el.hasClass('rt-th') && el.text() === column)
    .click();

  const customersRows = () => customersTable()
    .find('.rt-tbody .rt-tr')
    .map(row => row.find('.rt-td').map(el => el.text()));

  const clickOnCustomerAtRow = (index) => customersTable()
    .find('.rt-tbody .rt-tr').at(index)
    .click();

  return {
    customersTableColumns,
    customersTableRowAt,
    numberOfCustomerRows,
    clickOnColumnHeader,
    customersRows,
    clickOnCustomerAtRow
  };
};
