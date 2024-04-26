const { Router } = require("express");
const {
  Ambassadors,
  Create,
  Update,
  Delete,
  GetUser,
  GetAllUsers,
  HealthCheck,
} = require("./controller/user.controller");

export const routes = (router) => {
  // TODO: Add middleware
  router.post("/api/admin/ms/user", Create);
  router.delete("/api/admin/ms/user/:id", Delete);
  router.get("/api/admin/ms/user/:id", GetUser);
  router.get("/api/admin/ms/users", GetAllUsers);
  router.patch("/api/admin/ms/user/:email", Update);
  router.get("/api/admin/ms/ambassadors", Ambassadors);
  router.get("/api/admin/ms/healthCheck", HealthCheck);
};