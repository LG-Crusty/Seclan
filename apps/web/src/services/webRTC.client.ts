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

    const pingingServer = messangerService.connect();
    if (pingingServer && pingingServer.message != "") {
      const dataChannel = this.connection.createDataChannel("");
      if (dataChannel) {
        console.log("successfully created data channel");
      }
      // setting up the ice candidate
      this.connection.onicecandidate = (event) => {
        if (event.candidate !== null) {
         console.log(event.candidate)
          // sending this to the signaling server
          messangerService.shareVal(event.candidate);
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




// import { messangerService } from "@/utils/signalChannel";

// export class webRTCPeer {
//   private connection: RTCPeerConnection | null = null;
//   private initialized = false;

//   constructor(private configuration: RTCConfiguration) {}

//   async initialize() {
//     try {
//       this.connection = new RTCPeerConnection(this.configuration);
//       this.initialized = true;

//       // Setup signaling listeners
//       this.setupSignalListeners();

//       return "Server successfully initialized";
//     } catch (error) {
//       console.error("Error while creating RTC server:", error);
//     }
//   }

//   private setupSignalListeners() {
//     messangerService.onValue(async (data: any) => {
//       if (!this.connection) return;

//       if (data.type === "answer") {
//         try {
//           await this.connection.setRemoteDescription(new RTCSessionDescription(data));
//           console.log("Remote description set");
//         } catch (err) {
//           console.error("Error setting remote description:", err);
//         }
//       } else if (data.candidate) {
//         try {
//           await this.connection.addIceCandidate(new RTCIceCandidate(data));
//           console.log("Added remote ICE candidate");
//         } catch (err) {
//           console.error("Error adding ICE candidate:", err);
//         }
//       }
//     });
//   }

//   async makeCall() {
//     if (!this.connection) {
//       return "make initialization call";
//     }

//     const pingingServer = await messangerService.connect();
//     if (pingingServer && pingingServer.message !== "") {
//       const dataChannel = this.connection.createDataChannel("chat");
//       dataChannel.onopen = () => {
//         console.log("Data channel open");
//       };

//       this.connection.onicecandidate = (event) => {
//         if (event.candidate) {
//           messangerService.shareVal({ candidate: event.candidate });
//         }
//       };

//       try {
//         const offer = await this.connection.createOffer();
//         await this.connection.setLocalDescription(offer);
//         messangerService.shareVal({ type: "offer", sdp: offer.sdp });
//       } catch (error) {
//         console.error("Failed to create offer:", error);
//       }
//     }
//   }
//   closeCall() {
//     this.connection?.close();
//   }

//   get ready() {
//     return this.initialized && this.connection !== null;
//   }
// }
// const configuration: RTCConfiguration = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };
// const webRTCService = new webRTCPeer(configuration);
// export { webRTCService };