import React from "react";
import { Post } from "../../types/types";
import { useRouter } from "next/router";
import styles from "../../styles/Post.module.css";

type Props = {
  post: Post;
};

// 必要なデータのidを取得する
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // fallback:存在しないページに対するアクション
  return { paths, fallback: true };
}

// ISR
export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

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
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>Posted on {post.created_at}</div>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
};

export default Post;
