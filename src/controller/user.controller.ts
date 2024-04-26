import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getRepository } from "typeorm";

export const Ambassadors = async (req, res) => {
  res.send(
    await getRepository(User).find({
      is_admin: false,
    })
  );
};

export const Create = async (req: Request, res: Response) => {
  const { password, ...body } = req.body;

  const user = await getRepository(User).save({
    ...req.body,
    is_admin: req.path === "/api/admin/create",
  });

  res.send(user);
};

export const Delete = async (req: Request, res: Response) => {
  try {
    await getRepository(User).delete({ id: Number(req?.params?.id) });
    res.send({ message: "user deleted." });
  } catch (e) {
    res.send({ message: "user doesn't exist." });
  }
};

export const Update = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({
    email: req?.params?.email,
  });
  if (user) {
    const updated_user = {
      ...user,
      ...req.body,
    };

    const newUser = await getRepository(User).save(updated_user);
    res.send(newUser);
  } else {
    res.send({ message: "user doesn't exist." });
  }
};

export const GetUser = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({
    id: Number(req?.params?.id),
  });
  if (user) {
    res.send(user);
  } else {
    res.send({ message: "user doesn't exist." });
  }
};

export const GetAllUsers = async (req: Request, res: Response) => {
  const users = await getRepository(User).find();

  res.send(users);
};

export const HealthCheck = async(req: Request, res: Response) => {
  res.send({});
}
