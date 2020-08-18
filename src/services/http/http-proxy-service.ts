export class ProxyService {
  private _classes: { [key: string]: any } = {};

  constructor(className: string) {
    return this._classes[className];
  }
}
