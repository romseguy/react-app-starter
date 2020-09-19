import nextConnect from "next-connect";
import middleware from "middlewares/database";
import { getSession } from "next-auth/client";
import { createServerError } from "utils/mongoose";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: "You must be signed in" });
  } else {
    try {
      const profiles = await req.models.Profile.find({});
      res.json({ data: profiles });
    } catch (error) {
      createServerError(error);
    }
  }
});

handler.post(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: "You must be signed in" });
  } else {
    try {
      const { firstname, lastname, birthdate } = req.body;
      const profile = await req.models.Profile.create({
        firstname,
        lastname,
        birthdate,
      });
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json(createServerError(error));
    }
  }
});

export default handler;
