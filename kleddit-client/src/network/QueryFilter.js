const PAGE = 'page';
const LIMIT = 'limit';

export class QueryBuilder {

  constructor(url) {
    this.url = this.applyQuestionMark(url);
    this.page = null;
    this.limit = null;
    this.appliedQueryParams = 0;
  }

  /**
   *
   * @param url
   * @returns {QueryBuilder}
   */
  static create(url) {
    return new QueryBuilder(url);
  }

  withPage = (page) => {
    this.page = page;
    return this;
  };

  withLimit = (limit) => {
    this.limit = limit;
    return this;
  };

  /**
   * Returns the url with all query parameters applied.
   * @returns {String} url
   */
  getUrl = () => {
    this.applyQueryParameter(PAGE, this.page);
    this.applyQueryParameter(LIMIT, this.limit);
    return this.url;
  };

  applyQueryParameter = (parameter, value) => {
    if(value) {
      if(this.appliedQueryParams > 0) {
        this.url += '&';
      }
      this.url += `${parameter}=${value}`;
      ++this.appliedQueryParams;
    }
  };

  /**
   * Appends question mark at the end of the url and returns the url.
   * If the question mark is already there, returns the url.
   * @param url
   */
  applyQuestionMark = (url) => {
    if(typeof url !== 'string') {
      throw new Error(`Url has to be a string, it was ${url}`);
    }

    const lastChar = url.charAt(url.length - 1);
    if(lastChar !== '?') {
      url += '?';
    }
    return url;
  }

}