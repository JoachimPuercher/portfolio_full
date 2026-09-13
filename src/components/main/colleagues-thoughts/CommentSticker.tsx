/* eslint-disable @next/next/no-img-element -- plain <img> keeps the image sizing of the Angular templates */
import { cn } from "@/helpers/cn";
import { LINKEDIN_ICON_PATH } from "./linkedin-icon";
import styles from "./CommentSticker.module.css";

interface CommentStickerProps {
  comment: string;
  name: string;
  role: string;
  /** LinkedIn profile; Angular passed `false` and hid the link with display:none */
  profileLink?: string;
  profileLabel: string;
  bgImgPath: string;
  hoverImgPath: string;
}

/**
 * Angular: main/colleagues-thoughts/comment-sticker.
 * Testimonial note: paper background, scribble overlay on hover, quote, name, role and profile link.
 * Semantics: <article> + <blockquote> instead of <section> + <span> (same look).
 */
export default function CommentSticker({ comment, name, role, profileLink, profileLabel, bgImgPath, hoverImgPath }: CommentStickerProps) {
  return (
    <article className={styles.sticker}>
      <img src={bgImgPath} alt="sticker background" loading="lazy" />
      <img className={styles.hoverOne} src={hoverImgPath} alt="sticker hover background" loading="lazy" />
      <blockquote className={cn("h4-text-typo", styles.comment)}>{comment}</blockquote>
      <div className={styles.bottomWrapper}>
        <div className={styles.nameWrapper}>
          <span className="sticker-name">{name}</span>
          <span className="sticker-name-job-text">{role}</span>
        </div>
        {profileLink && (
          <a href={profileLink} target="_blank" rel="noopener noreferrer" className={styles.profileWrapper}>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d={LINKEDIN_ICON_PATH} fill="#0E1013" />
            </svg>
            <span className="sticker-profile-link-text">{profileLabel}</span>
          </a>
        )}
      </div>
    </article>
  );
}
