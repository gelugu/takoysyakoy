import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/" as="/">
          takoysyakoy gallery
        </Link>
      </h1>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <h2>
            <Link href="/projects" as="/projects">
              projects
            </Link>
          </h2>
        </li>

        <li className={styles.item}>
          <h2>
            <Link href="/about" as="/about">
              about
            </Link>
          </h2>
        </li>
      </ul>
    </nav>
  );
};
