import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await prisma.post.findUnique({
      where: {
        id: Number(req.query.postId),
      },
    });

    // console.log(records);

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです。" });
  }
}
