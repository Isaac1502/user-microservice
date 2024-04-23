import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { getRepository } from "typeorm";
import bcryptjs from 'bcryptjs';


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

export const Create = async (req, res) => {
  const { password, ...body } = req.body;

  const user = await getRepository(User).save({
    ...body,
    password: await bcryptjs.hash(password, 10),
    is_ambassador: req.path === "/api/ambassador/register",
  }); // TODO: google create (body)

  delete user.password;

  res.send(user);
};

export const Delete = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await getRepository(User).delete(id);
  } catch (e) {
    res.send({ message: "user doesn't exist." });
  }
};

export const Update = async (req, res) => {
  const { id, ...body } = req.body;

  const user = await getRepository(User).findOne({ id });

  const updated_user = {
    ...user,
    ...body,
  };

  await getRepository(User).save(updated_user);
};

export const GetUser = async (req, res) => {
  const { id } = req.body;

  const user = await getRepository(User).findOne({ id });

  res.send(user);
};
