import { mount } from 'enzyme';

const extendToCurrentData = (next, current) => ({ ...current, ...next });

const havingText = (text) => (el) => {
  if (!el || el.length !== 1) {
    return false;
  }
  return el && el.instance() && el.text() === text;
};

const havingClass = (className) => (el) => (el.prop('className') || '').includes(className);

const commonWrapper = {
  findByText(text) {
    return this.findWhere(havingText(text));
  },
  findByClass(className) {
    return this.findWhere(havingClass(className));
  },
  findByDataTest(dataTest) {
    return this.find(`[data-test="${dataTest}"]`);
  },
  click() {
    return this.simulate('click');
  },
  blur() {
    return this.simulate('blur');
  }
};

const extendReactWrapperWithCommonMethods = (component) =>
  Object.setPrototypeOf(component, Object.assign(Object.getPrototypeOf(component), commonWrapper));

const combineAllWrappers = (wrappers, extendedComponent) =>
  wrappers.map(part => part(extendedComponent))
    .reduce((result, nextWrapper) => extendToCurrentData(nextWrapper, result), {});

const wrapperMethodsAsPrototypeOf = (extendedComponent, wrapper) =>
  Object.setPrototypeOf(extendedComponent, Object.assign(Object.create(Object.getPrototypeOf(extendedComponent)), wrapper));

export const createComponentWrapperFor = (...wrappers) => (component) => {
  const extendedComponent = extendReactWrapperWithCommonMethods(component);
  if (wrappers.length === 0) {
    return extendedComponent;
  }
  const wrapper = combineAllWrappers(wrappers, extendedComponent);
  return wrapperMethodsAsPrototypeOf(extendedComponent, wrapper);
};

export const mountWithCustomWrappers = (node, ...wrappers) => createComponentWrapperFor(...wrappers)(mount(node));
