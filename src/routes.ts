const { Router } = require("express");
const {
  Ambassadors,
  Create,
  Update,
  Delete,
  GetUser,
  GetAllUsers,
} = require("./controller/user.controller");

export const routes = (router) => {
  // TODO: Add middleware
  router.post("/api/admin/user", Create);
  router.delete("/api/admin/user/:id", Delete);
  router.get("/api/admin/user/:id", GetUser);
  router.get("/api/admin/users", GetAllUsers);
  router.patch("/api/admin/user/:email", Update);
  router.get("/api/admin/ambassadors", Ambassadors);
};
