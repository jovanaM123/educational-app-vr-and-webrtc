import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { Instance } from 'simple-peer';

@Component({
  selector: 'app-videopoziv',
  templateUrl: './videopoziv.component.html',
  styleUrls: ['./videopoziv.component.css']
})
export class VideopozivComponent implements OnInit {

  totalConnectionsNumber = 0;
  socket: SocketIOClient.Socket;

  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('videos') videos: ElementRef;
  @ViewChild('hangupButton') hangupButton: ElementRef;

  constructor() { 
  }


  
  /**
   * The stream object used to send media
   */
   localStream = null;

  /**
   * All peer connections
   */
   peers = {}
   hangupButtonDisabled = true;


  ngOnInit(): void {  
    this.povezivanje();
  }
  
  
  //////////// CONFIGURATION //////////////////
  
  /**
   * RTCPeerConnection configuration 
   */
//    configuration = {
//       "iceServers": [{
//               "urls": "stun:stun.l.google.com:19302"
//           },

//           {
//               url: 'turn:192.158.29.39:3478?transport=udp',
//               credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//               username: '28224511:1379330808'
//           }
//       ]
//   }

  configuration = { iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
    {
      urls: [
        "stun:global.stun.twilio.com:3478?transport=udp",
      ],
    },
  ]}
  /**
   * UserMedia constraints
   */
  constraints = {
      audio: true,
      video: true
  }
  
  /////////////////////////////////////////////////////////
  
  povezivanje() {
      // enabling the camera at startup

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(this.init.bind(this))
      .catch(function(error){
        console.log('Unable to fetch media stream' + error.toString());
      });

  }
  

  
  /**
   * initialize the socket connections
   */
     init(mediaStream) {
      this.localVideo.nativeElement.srcObject = mediaStream;
      this.localStream = mediaStream;
      this.hangupButtonDisabled = false;      

      this.socket = io.connect('http://localhost:4000');
  
      this.socket.on('initReceive', socket_id => {
          console.log('INIT RECEIVE ' + socket_id)
          this.addPeer(socket_id, false)
  
          this.socket.emit('initSend', socket_id)
      })
  
      this.socket.on('initSend', socket_id => {
          console.log('INIT SEND ' + socket_id)
          this.addPeer(socket_id, true)
      })
  
      this.socket.on('removePeer', socket_id => {
          console.log('removing peer ' + socket_id)
          this.removePeer(socket_id)
      })
  
      this.socket.on('disconnect', () => {
          console.log('GOT DISCONNECTED')
          for (let socket_id in this.peers) {
              this.removePeer(socket_id)
          }
      })
  
      this.socket.on('signal', data => {
          this.peers[data.socket_id].signal(data.signal)
      })
  }
  
  /**
   * Remove a peer with given socket_id. 
   * Removes the video element and deletes the connection
   * @param {String} socket_id 
   */
  removePeer(socket_id) {
  
      let videoEl = document.getElementById(socket_id) as HTMLVideoElement
      if (videoEl) {  
          videoEl.srcObject = null
          videoEl.parentNode.removeChild(videoEl)
      }
      if (this.peers[socket_id]) this.peers[socket_id].destroy()
      delete this.peers[socket_id]
  }
  
  /**
   * Creates a new peer connection and sets the event listeners
   * @param {String} socket_id 
   *                 ID of the peer
   * @param {Boolean} am_initiator 
   *                  Set to true if the peer initiates the connection process.
   *                  Set to false if the peer receives the connection. 
   */
  addPeer(socket_id, am_initiator) {
    this.peers[socket_id] = new SimplePeer({
          initiator: am_initiator,
          stream: this.localStream,
          config: this.configuration
      })
  

      this.peers[socket_id].on('signal', data => {

        this.socket.emit('signal', {
              signal: data,
              socket_id: socket_id
          })
      })
  
      this.peers[socket_id].on('stream', stream => {
          let newVid = document.createElement('video')
          newVid.srcObject = stream
          newVid.id = socket_id
          newVid.autoplay = true
          newVid.className = "vid"
          newVid.width = 150
          newVid.height = 150
          newVid.onclick = () => this.openPictureMode(newVid)
          newVid.ontouchstart = (e) => this.openPictureMode(newVid)
          this.videos.nativeElement.appendChild(newVid)
      })
  }
  
  /**
   * Opens an element in Picture-in-Picture mode
   * @param {HTMLVideoElement} el video element to put in pip mode
   */
   openPictureMode(el) {
      el.requestPictureInPicture()
  }
  
  /**
   * Switches the camera between user and environment. It will just enable the camera 2 cameras not supported.
   */
  switchMedia() {  
      const tracks = this.localStream.getTracks();
  
      tracks.forEach(function (track) {
          track.stop()
      })
  
      this.localVideo.nativeElement.srcObject = null
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
  
          for (let socket_id in this.peers) {
              for (let index in this.peers[socket_id].streams[0].getTracks()) {
                  for (let index2 in stream.getTracks()) {
                      if (this.peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                        this.peers[socket_id].replaceTrack(this.peers[socket_id].streams[0].getTracks()[index], stream.getTracks()[index2], this.peers[socket_id].streams[0])
                          break;
                      }
                  }
              }
          }
  
          this.localStream = stream
          this.localVideo.nativeElement.srcObject = stream
  
      })
  }
  
  /**
   * Enable screen share
   */
   setScreen() {
      navigator.mediaDevices.getUserMedia().then(stream => {
          for (let socket_id in this.peers) {
              for (let index in this.peers[socket_id].streams[0].getTracks()) {
                  for (let index2 in stream.getTracks()) {
                      if (this.peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
                        this.peers[socket_id].replaceTrack(this.peers[socket_id].streams[0].getTracks()[index], stream.getTracks()[index2], this.peers[socket_id].streams[0])
                          break;
                      }
                  }
              }
  
          }

          this.localStream = stream
  
          this.localVideo.nativeElement.srcObject = this.localStream
          this.socket.emit('removeUpdatePeer', '')
      })
  }
  
  /**
   * Disables and removes the local stream and all the connections to other peers.
   */
  removeLocalStream() {
      if (this.localStream) {
          const tracks = this.localStream.getTracks();
  
          tracks.forEach(function (track) {
              track.stop()
          })
  
          this.localVideo.nativeElement.srcObject = null
      }
  
      for (let socket_id in this.peers) {
        this.removePeer(socket_id)
      }
  }
  

  
  hangup() {
    this.hangupButtonDisabled = true;
    this.removeLocalStream();
  }
 

}


