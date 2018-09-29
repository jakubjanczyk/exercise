export const wrapperForCustomersDetails = (component) => {
  const customerDetailsComponent = () => component.findByDataTest('customer-details');
  const goBackToList = () => customerDetailsComponent().findByDataTest('back-button').click();

  const customerDetailsId = () => customerDetailsComponent().findByDataTest('customer-id').findByDataTest('value').text();
  const customerDetailsName = () => customerDetailsComponent().findByDataTest('customer-name').findByDataTest('value').text();
  const customerDetailsCreatedAt = () => customerDetailsComponent().findByDataTest('customer-created-at').findByDataTest('value').text();
  const customerDetailsPhone = () => customerDetailsComponent().findByDataTest('customer-phone').findByDataTest('value').text();
  const customerDetailsStatus = () => customerDetailsComponent().findByDataTest('customer-status').findByDataTest('value').text();

  return {
    customerDetailsComponent,
    goBackToList,
    customerDetailsId,
    customerDetailsName,
    customerDetailsCreatedAt,
    customerDetailsPhone,
    customerDetailsStatus,
  };
};
