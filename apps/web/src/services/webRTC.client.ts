// creating a rtc server
import { messangerService } from "@/utils/signalChannel";

// creating the server class
export class webRTCPeer {
  private connection: RTCPeerConnection | null = null;
  private initialized = false;

  constructor(private configuration: RTCConfiguration) {}

  async initialize() {
    try {
      this.connection = new RTCPeerConnection(this.configuration);
      this.initialized = true;
      if (this.connection && this.initialized) {
        return "Server successfully initialized";
      }
    } catch (error) {
      console.error("error while creating RTC server");
    }
  }

  async makeCall() {
    //  check if the connection is setup or not
    if (!this.connection) {
      return "make initialization call";
    }
     
    // calling signaling service 
    const pingingServer = messangerService.connect();
     console.log(pingingServer)
    if (pingingServer && pingingServer.message != "") {
      
      const dataChannel = this.connection.createDataChannel("");

      if (dataChannel) {
        console.log("successfully created data channel");
      }

      // setting up the ice candidate
      this.connection.onicecandidate = (event) => {
        if (event.candidate !== null) {
          console.log(event.candidate);
          // sending this to the signaling server
          messangerService.shareVal(event.candidate).then((message) => {
            console.log(message);
          });
        }
      };

      //  creating offer for the server
      try {
        const offer = await this.connection.createOffer();
        await this.connection.setLocalDescription(offer);
      } catch (error) {
        console.error("failed to create offer");
      }
    }
  }

  closeCall() {
    this.connection?.close();
  }
  get ready() {
    return this.initialized && this.connection !== null;
  }
}

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const webRTCService = new webRTCPeer(configuration);

export { webRTCService };
