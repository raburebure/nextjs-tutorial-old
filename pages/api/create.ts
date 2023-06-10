import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ...reqData } = req.body;

  console.log(reqData);

  if (!reqData) {
    return res.status(400).json({ message: "投稿内容がありません。" });
  }

  try {
    // テーブルに登録
    const newPost = await prisma.post.create({
      data: {
        title: reqData.title,
        content: reqData.content,
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです。" });
  }
}
