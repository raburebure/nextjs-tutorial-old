import Link from "next/link";
import React from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerLayout}>
      <Link href="/" className={styles.title}>
        <h1>Next.js Blog</h1>
      </Link>
      <Link href="/create-post" className={styles.createButton}>
        新規作成
      </Link>
    </div>
  );
}
