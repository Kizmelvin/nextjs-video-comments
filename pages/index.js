import { listComments, saveComments } from "../helper/Utils";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();

  const [comments, setComments] = useState();
  const [myInput, setMyInput] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [timestamp, setTimestamp] = useState(null);
  const [viewComments, setViewComments] = useState(false);

  const details = {
    comment: `${myInput}`,
    videoTime: `${timestamp}`,
    name: "Anonymous",
  };

  const handleSubmit = () => {
    saveComments(details);
    setMyInput("");
    playerRef.current?.play();
    playerRef.current?.controls(true);
  };

  useEffect(() => {
    listComments({ setComments });
    //Cloudinary instance
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;

    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "kizmelvin",
      secure: true,
    });
  }, [handleSubmit]);

  const openComment = () => {
    playerRef.current?.pause();
    playerRef.current?.controls(false);
    setIsClicked(true);
    let time = playerRef.current?.currentTime();
    if (time >= 60) {
    } else {
      setTimestamp((time / 100).toFixed(2));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:justify-around lg:py-2">
      <section className="lg:flex lg:w-8/12 flex-col items-center justify-center px-10 text-center">
        {/* Video player */}
        <div className="w-full">
          <video
            ref={videoRef}
            id="demo-player"
            className="cld-video-player cld-fluid "
            controls
            data-cld-public-id="video-demo"
          />
        </div>

        {isClicked ? (
          <div className="flex items-center w-full mt-10 py-2">
            <input
              className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Write your comment"
              name="comment"
              value={myInput || ""}
              onChange={(e) => setMyInput(e.target.value)}
            />
            {/* Submit and Cancel buttons  */}
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="border-none border-4 text-red-500  text-sm lg:py-1 px-2 rounded"
              type="button"
              onClick={() => {
                setIsClicked(false);
                playerRef.current?.play();
                playerRef.current?.controls(true);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          //Comment button
          <button
            className=" text-center bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 lg:mt-20 rounded"
            onClick={openComment}
          >
            <span>Comment</span>
          </button>
        )}
      </section>
      <section className="px-10">
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 mt-20 px-2 rounded"
          type="button"
          onClick={() => setViewComments(!viewComments)}
        >
          {viewComments ? "Hide Comments" : "View Comments"}
        </button>
        {viewComments && (
          <div className=" bg-gray-100 w-full p-4">
            {comments &&
              comments.map((comm) => (
                <div className="border-2 p-4" key={comm.$id}>
                  <p className="text-gray-900 font-black">
                    {comm.name} {""} :{" "}
                    <span className="text-blue-500 font-normal">
                      {comm.videoTime}
                    </span>
                  </p>
                  <div className="p-5">
                    <p>{comm.comment}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
