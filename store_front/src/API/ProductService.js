import axios from "axios";

export default class ProductService {
  static api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });

  static async getProduct(productSlug) {
    const response = await this.api(`products/${productSlug}`);
    return response.data;
  }
}
