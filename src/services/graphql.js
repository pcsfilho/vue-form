import service from "./api";

/**
 * GRAPHiQL
 */
export async function query(query, params) {
  return service
    .post(`graphql`, { query })
    .then(response => {
      return response.data.data;
    })
    .catch(err => console.error(err));
}

export default {
  query
};