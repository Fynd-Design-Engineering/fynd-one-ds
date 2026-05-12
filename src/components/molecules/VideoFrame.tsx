import React, { CSSProperties } from 'react';
import styles from './VideoFrame.module.css';

export interface VideoFrameProps {
  /** Background image URL for the outer wrapper. */
  backgroundImage: string;
  /** Background image for mobile (≤479px). Falls back to backgroundImage if not provided. */
  mobileBg?: string;
  /** Primary video source (mp4). */
  videoSrc: string;
  /** Optional WebM source for broader codec support. */
  videoWebmSrc?: string;
  /** Poster image shown before the video plays. */
  poster?: string;
  /**
   * Mobile-specific video source. When provided it swaps in at ≤767px
   * and drives the aspect ratio for that breakpoint.
   */
  mobileVideoSrc?: string;
  /** Mobile-specific WebM source. */
  mobileVideoWebmSrc?: string;
  className?: string;
  style?: CSSProperties;
}

const VideoEl: React.FC<{
  src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
}> = ({ src, webmSrc, poster, className }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    poster={poster}
    controlsList="nodownload noremoteplayback noplaybackrate"
    className={className}
  >
    {webmSrc && <source src={webmSrc} type="video/webm" />}
    <source src={src} type="video/mp4" />
  </video>
);

export const VideoFrame: React.FC<VideoFrameProps> = ({
  backgroundImage,
  mobileBg,
  videoSrc,
  videoWebmSrc,
  poster,
  mobileVideoSrc,
  mobileVideoWebmSrc,
  className,
  style,
}) => {
  const rootClass = [
    styles.root,
    mobileVideoSrc && styles.hasMobileVideo,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle: CSSProperties = {
    '--vf-bg': `url(${backgroundImage})`,
    ...(mobileBg ? { '--vf-mobile-bg': `url(${mobileBg})` } : {}),
    ...style,
  } as CSSProperties;

  return (
    <div className={rootClass} style={rootStyle}>
      <div className={styles.videoWrap}>
        <VideoEl
          src={videoSrc}
          webmSrc={videoWebmSrc}
          poster={poster}
          className={[styles.video, mobileVideoSrc && styles.videoDesktop]
            .filter(Boolean)
            .join(' ')}
        />
        {mobileVideoSrc && (
          <VideoEl
            src={mobileVideoSrc}
            webmSrc={mobileVideoWebmSrc}
            poster={poster}
            className={[styles.video, styles.videoMobile].join(' ')}
          />
        )}
      </div>
    </div>
  );
};

VideoFrame.displayName = 'VideoFrame';

export default VideoFrame;
