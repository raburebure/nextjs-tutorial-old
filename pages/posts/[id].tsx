import React from "react";
import { Post } from "../../types/types";
import { useRouter } from "next/router";
import styles from "../../styles/Post.module.css";
import apiClient from "@/lib/apiClient";

type Props = {
  post: Post;
};

// 必要なデータのidを取得する
export async function getStaticPaths() {
  // axiosを使用してデータを取得
  const posts: Post[] = await apiClient.get("/read-all").then((res) => res.data);

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // fallback:存在しないページに対するアクション
  return { paths, fallback: true };
}

// ISR
export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await apiClient
    .get("/read", {
      params: {
        postId: params.id,
      },
    })
    .then((res) => res.data);

  return {
    props: {
      post,
    },
    revalidate: 60, // In seconds
  };
}

const Post = ({ post }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.date}>
          <span>Posted on {post.created_at}</span>
        </div>
        <p className={styles.content}>{post.content}</p>
      </div>
    </>
  );
};

export default Post;
