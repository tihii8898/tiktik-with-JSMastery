// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);
    const user = await client.fetch(singleUserQuery(id));
    const userVideos = await client.fetch(userVideosQuery);
    const userLikeVideos = await client.fetch(userLikedVideosQuery);

    res.status(200).json({ user: user[0], userVideos, userLikeVideos });
  }
}
