export class Section{

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderCard(data) {
    data.reverse().forEach(card => {
      this._renderer(card);
    })
  }

  addItem(element) {
    this._container.prepend(element);
}
}