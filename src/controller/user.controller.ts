import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getRepository } from "typeorm";

// export const Ambassadors = async (req, res) => {
//   res.send(
//     await getRepository(User).find({
//       is_ambassador: true
//     })
//   );
// };

// export const Rankings = async (req, res) => {
//   const result = await client.sendCommand([
//     "ZREVRANGEBYSCORE",
//     "rankings",
//     "+inf",
//     "-inf",
//     "WITHSCORES",
//   ]);
//   let name;

//   res.send(
//     result.reduce((o, r) => {
//       if (isNaN(parseInt(r))) {
//         name = r;
//         return o;
//       } else {
//         return {
//           ...o,
//           [name]: parseInt(r),
//         };
//       }
//     }, {})
//   );
// };

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
    await getRepository(User).delete(req?.params?.id);
    res.send({ message: "user deleted." });
  } catch (e) {
    res.send({ message: "user doesn't exist." });
  }
};

export const Update = async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne({
    id: Number(req?.params?.id),
  });
  if (user) {
    const updated_user = {
      ...user,
      ...req.body,
    };

    await getRepository(User).save(updated_user);
    res.send({ message: "user updated." });
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
