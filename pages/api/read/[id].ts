import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// ダイナミックルーティングで呼び出されるread
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await prisma.post.findUnique({
      where: {
        id: Number(req.query.id),
      },
    });

    // console.log(records);

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです。" });
  }
}
