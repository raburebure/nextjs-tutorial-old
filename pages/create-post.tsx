import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import apiClient from "@/lib/apiClient";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //API
    try {
      await apiClient.post("/create", {
        title: title,
        content: content,
      });

      // Home に戻る
      router.push("/");
    } catch (err) {
      console.log("投稿に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
