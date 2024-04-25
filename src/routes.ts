const { Router } = require("express");
const {
  Ambassadors,
  Rankings,
  Create,
  Update,
  Delete,
  GetUser,
  GetAllUsers,
} = require("./controller/user.controller");

export const routes = (router) => {
  // TODO: Add middleware
  router.post("/api/admin/create", Create);
  router.post("/api/admin/delete", Delete);
  router.delete("/api/user/:id", Delete);
  router.get("/api/user/:id", GetUser);
  router.get("/api/users", GetAllUsers);
  router.post("/api/user", Create);
  router.patch("/api/user/:id", Update);
};
