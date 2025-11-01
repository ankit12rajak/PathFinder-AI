import { useState, useEffect } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import AvatarVoiceAgent from "./AvatarVoiceAgent";
import "./LiveKitWidget.css";
import { getAgentConfig, AgentType, getLiveKitUrl } from "@/services/agentTokenService";

/**
 * LiveKitWidget Component
 * Accepts agentType prop to dynamically load the correct token and room configuration
 * @param {string} agentType - The type of agent (technical or behavioral)
 * @param {function} setShowSupport - Callback to hide the widget
 * @param {function} onDisconnected - Callback when disconnected
 */
const LiveKitWidget = ({ agentType = AgentType.TECHNICAL, setShowSupport, onDisconnected }) => {
  const [token, setToken] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the correct token and room based on agent type
    try {
      const config = getAgentConfig(agentType);
      
      if (!config.token) {
        setError(`Token not configured for ${agentType} agent. Check your .env file.`);
        console.error(`LiveKit ${agentType} token not found in .env file`);
        setIsConnecting(false);
        return;
      }

      setToken(config.token);
      setRoomName(config.room);
      console.log(`Connected to ${agentType} agent with room: ${config.room}`);
      setIsConnecting(false);
    } catch (err) {
      setError(err.message);
      console.error("Error loading agent config:", err);
      setIsConnecting(false);
    }
  }, [agentType]);

  return (
    <div className="modal-content">
      <div className="support-room">
        {isConnecting ? (
          <div className="connecting-status">
            <h2>Connecting to {agentType === AgentType.BEHAVIORAL ? "Behavioral" : "Technical"} AI Agent...</h2>
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
        ) : error ? (
          <div className="connecting-status">
            <h2>Error: {error}</h2>
            <p>Please check your .env file configuration</p>
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
        ) : token ? (
          <LiveKitRoom
            serverUrl={getLiveKitUrl()}
            token={token}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => {
              console.log(`LiveKit disconnected from ${agentType} agent`);
              if (setShowSupport) setShowSupport(false);
              if (onDisconnected) onDisconnected();
              setIsConnecting(true);
            }}
          >
            <RoomAudioRenderer />
            <AvatarVoiceAgent agentType={agentType} roomName={roomName} />
          </LiveKitRoom>
        ) : (
          <div className="connecting-status">
            <h2>Error: LiveKit token not configured</h2>
            <p>Please check your .env file for the {agentType} token</p>
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