import axios from "axios";

export default class CategoryService {
  static api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });

  static async getAllCategories() {
    const response = await this.api('categories/');
    return response.data.results;
  } 
  
  static async getCategoryProducts(categorySlug) {
    const response = await this.api(`categories/${categorySlug}/products`);
    return response.data.results;
  }

  static async getComments(postId) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response;
  }
}
