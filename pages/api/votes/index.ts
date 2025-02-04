import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Vote from "../../../models/Vote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const pets = await Vote.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const pet = await Vote.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case "DELETE":
        try {
          await Vote.deleteMany({}); /* delete all votes from the database */
          res.status(200).json({ success: true, message: "All votes deleted" });
        } catch (error) {
          res.status(400).json({ success: false });
        }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
