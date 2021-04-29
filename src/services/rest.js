import service from "./api";

/**
 * GET USERS
 */
 export function getUsers() {
  return service
    .get(`users`)
    .then(response => {
      return response.data;
    });
}

/**
 * DELETE USER
 */
 export function deleteUser(id) {
  return service
    .del(`users/${id}`)
    .then(response => {
      return response.data;
    });
}

/**
 * CREATE USER
 */
 export function createUser(data) {
  return service
    .post(`users`, data)
    .then(response => {
      return response.data;
    });
}