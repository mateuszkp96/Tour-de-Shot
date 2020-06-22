export class Image {
  image = null;

  constructor(url: string) {
    this.image = {
      url: url,
      show: false
    };
  }
}
