import AgoraRTC, {
  AgoraRTCProvider,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import { useEffect, useRef, useState } from "react";

export const VideoCalling = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <Basics />
    </AgoraRTCProvider>
  );
};

const Basics = () => {
  const client = useRTCClient(); // Get the Agora client instance
  // Other state variables and functions...

  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [appId, setAppId] = useState("<-- Insert App ID -->");
  const [channel, setChannel] = useState("<-- Insert Channel Name -->");
  const [token, setToken] = useState("<-- Insert Token -->");
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const [screenTrack, setScreenTrack] = useState<any>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Mute local audio
  const muteLocalAudio = (audioTrack: IMicrophoneAudioTrack | null) => {
    if (!audioTrack) return;
    audioTrack.setVolume(0);
  };

  // Unmute local audio
  const unmuteLocalAudio = (audioTrack: IMicrophoneAudioTrack | null) => {
    if (!audioTrack) return;
    audioTrack.setVolume(100); // Set the volume to a reasonable volume level
  };

  // const videoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localCameraTrack && videoRef.current) {
      localCameraTrack.play(videoRef.current); // Provide the container element
    }
  }, [localCameraTrack]);

  useJoin(
    { appid: appId, channel: channel, token: token ? token : null },
    calling
  );
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // const remoteUsers = useRemoteUsers();

  const remoteUsers: IAgoraRTCRemoteUser[] = useRemoteUsers();

  const muteRemoteAudio = (users: IAgoraRTCRemoteUser[]) => {
    users.forEach((user) => {
      if (user.audioTrack) {
        user.audioTrack.setVolume(0);
      }
    });
  };

  const unmuteRemoteAudio = (users: IAgoraRTCRemoteUser[]) => {
    users.forEach((user) => {
      if (user.audioTrack) {
        user.audioTrack.setVolume(100); // Adjust volume as needed
      }
    });
  };

  // Function to Start Screen Sharing
  const startScreenSharing = async () => {
    try {
      const screenTracks = await AgoraRTC.createScreenVideoTrack(
        {
          encoderConfig: "1080p_1",
        },
        "auto" // Attempts to share audio if supported
      );

      let screenVideoTrack: ILocalVideoTrack;
      let screenAudioTrack: ILocalAudioTrack | null = null;

      if (Array.isArray(screenTracks)) {
        [screenVideoTrack, screenAudioTrack] = screenTracks;
      } else {
        screenVideoTrack = screenTracks;
      }

      console.log("Screen Video Track:", screenVideoTrack);
      console.log("Screen Audio Track:", screenAudioTrack);

      if (!client) {
        console.error("Agora client is not initialized.");
        return;
      }

      // Stop and unpublish the current camera track before switching to screen share
      if (localCameraTrack) {
        await client.unpublish(localCameraTrack);
        localCameraTrack.stop();
      }

      // Publish the screen video track
      await client.publish(screenVideoTrack);
      setScreenTrack(screenVideoTrack);

      // Play the screen video track in the UI (ensure you have a div for it)
      // screenVideoTrack.play(videoRef.current);
      if (videoRef.current) {
        screenVideoTrack.play(videoRef.current);
      } else {
        console.error("videoRef is null");
      }
      // Publish the screen audio track if available
      if (screenAudioTrack) {
        await client.publish(screenAudioTrack);
      }

      setIsSharing(true);
    } catch (error) {
      console.error("Error starting screen sharing:", error);
    }
  };

  // Function to Stop Screen Sharing
  const stopScreenSharing = async () => {
    if (screenTrack) {
      await client.unpublish(screenTrack);
      screenTrack.stop();
      setScreenTrack(null);
    }

    // Restart camera track
    if (localCameraTrack) {
      await client.publish(localCameraTrack);
    }

    setIsSharing(false);
  };

  return (
    <>
      <div>
        {isConnected ? (
          <div className="h-screen grid grid-cols-3 gap-5 justify-center items-center">
            {/* <div ref={videoRef} style={{ width: "90%", height: 300 }}></div> */}
            <div>
              {isSharing ? (
                <div ref={videoRef} style={{ width: "90%", height: 300 }}></div>
              ) : (
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  playAudio={false}
                  videoTrack={localCameraTrack}
                  style={{ width: "90%", height: 300 }}
                >
                  <samp>You</samp>
                </LocalUser>
              )}
            </div>

            {remoteUsers.map((user) => (
              <div key={user.uid}>
                <RemoteUser user={user} style={{ width: "90%", height: 300 }}>
                  <samp>{user.uid}</samp>
                </RemoteUser>
                <div>
                  <button onClick={() => muteLocalAudio(localMicrophoneTrack)}>
                    Mute Local User
                  </button>
                  <button
                    onClick={() => unmuteLocalAudio(localMicrophoneTrack)}
                  >
                    Unmute Local User
                  </button>
                  <button onClick={() => muteRemoteAudio(remoteUsers)}>
                    Mute All Remote Users
                  </button>
                  <button onClick={() => unmuteRemoteAudio(remoteUsers)}>
                    Unmute All Remote Users
                  </button>
                </div>
              </div>
            ))}
            {isSharing ? (
              <button onClick={stopScreenSharing} className="bg-red-500 p-2">
                Stop Screen Sharing
              </button>
            ) : (
              <button onClick={startScreenSharing} className="bg-green-500 p-2">
                Share Screen
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center h-screen items-center align-middle gap-4 ">
            <div className="flex gap-4">
              <input
                onChange={(e) => setAppId(e.target.value)}
                placeholder="<Your app ID>"
                value={appId}
                className="border border-purple-600 w-64 text-purple-600 rounded-sm hover:border-4"
              />
              <input
                onChange={(e) => setChannel(e.target.value)}
                placeholder="<Your channel Name>"
                value={channel}
                className="border border-purple-600 w-64 text-purple-600 rounded-sm hover:border-4"
              />
              <input
                onChange={(e) => setToken(e.target.value)}
                placeholder="<Your token>"
                value={token}
                className="border border-purple-600 w-64 text-purple-600 rounded-sm hover:border-4"
              />
            </div>
            <div>
              <button
                disabled={!appId || !channel}
                onClick={() => setCalling(true)}
                className="bg-purple-600 text-white font-semibold p-2 rounded-md hover:bg-purple-700"
              >
                Join Channel
              </button>
            </div>
          </div>
        )}
      </div>
      {isConnected && (
        <div style={{ padding: "20px" }}>
          <div>
            <button onClick={() => setMic((a) => !a)}>
              {micOn ? "Disable mic" : "Enable mic"}
            </button>
            <button onClick={() => setCamera((a) => !a)}>
              {cameraOn ? "Disable camera " : "Enable camera"}
            </button>
            <button onClick={() => setCalling((a) => !a)}>
              {calling ? "End calling" : "Start calling"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCalling;
