import { useState, useEffect } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import AvatarVoiceAgent from "./AvatarVoiceAgent";
import "./LiveKitWidget.css";

const LiveKitWidget = ({ setShowSupport, onDisconnected }) => {
  // Use token directly from .env file
  const token = import.meta.env.VITE_LIVEKIT_TOKEN;
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    // Check if token is available
    if (token) {
      console.log("LiveKit token loaded from .env");
      setIsConnecting(false);
    } else {
      console.error("LiveKit token not found in .env file");
      setIsConnecting(false);
    }
  }, [token]);

  return (
    <div className="modal-content">
      <div className="support-room">
        {isConnecting ? (
          <div className="connecting-status">
            <h2>Connecting to AI Interview Agent...</h2>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                if (setShowSupport) setShowSupport(false);
                if (onDisconnected) onDisconnected();
              }}
            >
              Cancel
            </button>
          </div>
        ) : token ? (
          <LiveKitRoom
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            token={token}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => {
              console.log("LiveKit disconnected");
              if (setShowSupport) setShowSupport(false);
              if (onDisconnected) onDisconnected();
              setIsConnecting(true);
            }}
          >
            <RoomAudioRenderer />
            <AvatarVoiceAgent />
          </LiveKitRoom>
        ) : (
          <div className="connecting-status">
            <h2>Error: LiveKit token not configured</h2>
            <p>Please check your .env file for VITE_LIVEKIT_TOKEN</p>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                if (setShowSupport) setShowSupport(false);
                if (onDisconnected) onDisconnected();
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveKitWidget;