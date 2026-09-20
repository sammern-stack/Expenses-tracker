import styles from "./QuoteBlock.module.scss";
import StarIcon from "@/assets/images/pattern-star.svg?react";

interface QuoteBlockProps {
  quote: string;
  author: string;
}

export const QuoteBlock = ({ quote, author }: QuoteBlockProps) => {
  return (
    <div className={styles.quote}>
      <div className={styles.quote__content}>
        <p className={styles.quote__text}>{quote}</p>
        <p className={styles.quote__author}>{author}</p>
        <StarIcon className={styles.quote__starIcon}/>
      </div>
    </div>
  );
};
