import http from "../http-common";

class ArtigoDataService {
  getAll() {
    return http.get("/artigos");
  }

  get(id) {
    return http.get(`/artigos/${id}`);
  }

  create(data) {
    return http.post("/artigos", data);
  }

  update(id, data) {
    return http.put(`/artigos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/artigos/${id}`);
  }

  deleteAll() {
    return http.delete(`/artigos`);
  }

  findByTitulo(titulo) {
    return http.get(`/artigos?titulo=${titulo}`);
  }
}

export default new ArtigoDataService();
