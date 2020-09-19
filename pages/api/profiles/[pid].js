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
    const {
      query: { pid },
    } = req;

    try {
      const profile = await req.models.Profile.findOne({ _id: pid });

      if (profile) {
        res.json({ data: profile });
      } else {
        res.status(400).json(createServerError(new Error("Profile not found")));
      }
    } catch (error) {
      createServerError(error);
    }
  }
});

handler.put(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: "You must be signed in" });
  } else {
    const {
      query: { pid },
    } = req;

    try {
      const { n, nModified } = await req.models.Profile.updateOne(
        { _id: pid },
        req.body
      );

      if (nModified === 1) {
        res.status(200).json({});
      } else {
        res
          .status(400)
          .json(createServerError(new Error("Profile could not be modified")));
      }
    } catch (error) {
      res.status(400).json(createServerError(error));
    }
  }
});

handler.delete(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({ error: "You must be signed in" });
  } else {
    const {
      query: { pid },
    } = req;

    try {
      const { deletedCount } = await req.models.Profile.deleteOne({ _id: pid });

      if (deletedCount === 1) {
        res.status(200);
      } else {
        res
          .status(400)
          .json(createServerError(new Error("Profile could not be deleted")));
      }
    } catch (error) {
      res.status(400).json(createServerError(error));
    }
  }
});

export default handler;
