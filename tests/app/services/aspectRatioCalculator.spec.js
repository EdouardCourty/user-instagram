const AspectRatioCalculator = require('../../../app/services/AspectRatioCalculator');

describe('Aspect ratio calculator', () => {
  it('Should calculate a correct ratio', () => {
    let aspectRatio = AspectRatioCalculator.getAspectRatio(1080, 1920, ':');
    expect(aspectRatio).toEqual('16:9');

    aspectRatio = AspectRatioCalculator.getAspectRatio(600, 800, ':');
    expect(aspectRatio).toEqual('4:3');
  });
});
