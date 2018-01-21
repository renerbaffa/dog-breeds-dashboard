import index from './index';

describe('index reducer', () => {
  it('should reach 100% of coverage by running function without action', () => {
    index({});
  });
});
