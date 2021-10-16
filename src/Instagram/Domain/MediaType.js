class MediaType {
  static TYPE_PICTURE = 'picture';
  static TYPE_VIDEO = 'video';
  static TYPE_MULTIPLE_PICTURE = 'multiple_picture';

  static INSTAGRAM_TYPE_PICTURE = 'GraphImage';
  static INSTAGRAM_TYPE_VIDEO = 'GraphVideo';
  static INASTAGRAM_TYPE_MULTIPLE_PICTURE = 'GraphSidecar';

  #value;
  
  constructor(type) {
    const matching = {};
    matching[MediaType.INSTAGRAM_TYPE_PICTURE] = MediaType.TYPE_PICTURE;
    matching[MediaType.INSTAGRAM_TYPE_VIDEO] = MediaType.TYPE_VIDEO;
    matching[MediaType.INASTAGRAM_TYPE_MULTIPLE_PICTURE] = MediaType.TYPE_MULTIPLE_PICTURE;
    if (!Object.keys(matching).includes(type)) {
      throw new Error(`${type} is not a valid Media type.`);
    }
    this.#value = matching[type];
  }

  getValue = () => this.#value;
}

module.exports = MediaType;
