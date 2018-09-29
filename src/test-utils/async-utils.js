export const flushPromises = async () => new Promise(resolve => setImmediate(resolve));
