import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Post } from "../../types/types";
import apiClient from "@/lib/apiClient";

type Props = {
  post: Post;
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  const res = await apiClient.get("/read", {
    params: {
      postId: id,
    },
  });

  // ダイナミックルーティング
  // const res = await apiClient.get(`/read/${id}`);

  return {
    props: {
      post: res.data,
    },
  };
}

const EditPost = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //API
    try {
      await apiClient.put("/update", {
        id: post.id,
        title: title,
        content: content,
      });

      router.push("/");
    } catch (err) {
      console.log("投稿に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <label className={styles.label}>Content:</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />
        <button className={styles.button} type="submit">
          編集
        </button>
      </form>
    </div>
  );
};

export default EditPost;
