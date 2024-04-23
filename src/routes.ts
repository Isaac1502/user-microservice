const { Router } = require("express");
const {
  Ambassadors,
  Rankings,
  Create,
  Update,
  Delete,
  GetUser,
} = require("./controller/user.controller");

export const routes = (router) => {
  // TODO: Add middleware
  router.post("/api/admin/create", Create);
  router.post("/api/admin/delete", Delete);
};
