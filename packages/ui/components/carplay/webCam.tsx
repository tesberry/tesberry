import React, { useEffect, useRef } from "react";

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 800} })
      .then(stream => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  return (
    <div >
      <div>
        <button>Take a photo</button>
        <video ref={videoRef} />
      </div>
    </div>
  );
};

export default Webcam;