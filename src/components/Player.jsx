import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

const Player = ({ video }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      // Use hls.js for playback if the browser doesn't natively support HLS
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play();
        });

        return () => {
          hls.destroy(); // Cleanup on unmount
        };
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        // Use native HLS support for Safari
        videoElement.src = src;
      }
    }

    return () => {
      // Dispose of the player if initialized
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Player;
