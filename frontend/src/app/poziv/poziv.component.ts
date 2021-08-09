import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-poziv',
  templateUrl: './poziv.component.html',
  styleUrls: ['./poziv.component.css']
})
export class PozivComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('startButton') startButton: ElementRef;
  @ViewChild('callButton') callButton: ElementRef;
  @ViewChild('hangupButton') hangupButton: ElementRef;
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  startButtonDisabled = false;
  callButtonDisabled = true;
  hangupButtonDisabled = true;

  startTime;
  localStream;
  pc1;
  pc2;
  offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };
 /*
  ngAfterViewInit() {
   this.localVideo.nativeElement.addEventListener('loadedmetadata', ()=> {
  this.trace('Local video videoWidth: ' + this.localVideo.nativeElement.videoWidth +
    'px,  videoHeight: ' + this.localVideo.nativeElement.videoHeight + 'px');
});

this.remoteVideo.nativeElement.addEventListener('loadedmetadata', ()=> {
  this.trace('Remote video videoWidth: ' + this.remoteVideo.nativeElement.videoWidth +
    'px,  videoHeight: ' + this.remoteVideo.nativeElement.videoHeight + 'px');
});

this.remoteVideo.nativeElement.onresize = ()=> {
  this.trace('Remote video size changed to ' +
    this.remoteVideo.nativeElement.videoWidth + 'x' + this.remoteVideo.nativeElement.videoHeight);
  
};
  }**/
  
  getName(pc) {
    return (pc === this.pc1) ? 'pc1' : 'pc2';
  }

  getOtherPc(pc) {
    return (pc === this.pc1) ? this.pc2 : this.pc1;
  }

  gotStream(stream) {
    this.trace('Received local stream');
    this.localVideo.nativeElement.srcObject = stream;
    this.localStream = stream;
    this.callButtonDisabled = false;
  }

  start() {
    this.trace('Requesting local stream');
    this.startButtonDisabled = true;
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    .then(this.gotStream.bind(this))
    .catch(function(e) {
      console.log('error', e);
      alert('getUserMedia() error: ' + e.name);
    });
  }
  
  call() {
    this.callButtonDisabled = true;
    this.hangupButtonDisabled = false;
    this.trace('Starting call');
    this.startTime = window.performance.now();
    var videoTracks = this.localStream.getVideoTracks();
    var audioTracks = this.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      this.trace('Using video device: ' + videoTracks[0].label);
    }
    if (audioTracks.length > 0) {
      this.trace('Using audio device: ' + audioTracks[0].label);
    }
    //var servers = null;
    const servers: any = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" }
      ]
    };
    this.pc1 = new RTCPeerConnection(servers);
    this.trace('Created local peer connection object pc1');

    this.pc1.addEventListener('icecandidate', (e: Event) => {
            this.onIceCandidate(this.pc1, e);
    });
    this.pc2 = new RTCPeerConnection(servers);
    this.trace('Created remote peer connection object pc2');

    this.pc2.addEventListener('icecandidate', (e: Event) => {
      this.onIceCandidate(this.pc2, e);
    });

    this.pc1.addEventListener('iceconnectionstatechange', (e: Event) => {
            this.onIceStateChange(this.pc1, e);
    });
    this.pc2.addEventListener('iceconnectionstatechange', (e: Event) => {
            this.onIceStateChange(this.pc2, e);
    });
    this.pc2.ontrack = this.gotRemoteStream.bind(this);

    this.localStream.getTracks().forEach(
      track => {
        this.trace('add tracks to pc1');
        this.pc1.addTrack(
          track,
          this.localStream
        );
      }
    );
    this.trace('Added local stream to pc1');

    this.trace('pc1 createOffer start');
    this.pc1.createOffer(
      this.offerOptions
    ).then(
      this.onCreateOfferSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  onCreateSessionDescriptionError(error) {
    this.trace('Failed to create session description: ' + error.toString());
  }

  onCreateOfferSuccess(desc) {
    this.trace('Offer from pc1\n' + desc.sdp);
    this.trace('pc1 setLocalDescription start');
    this.pc1.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc2 setRemoteDescription start');
    this.pc2.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    this.pc2.createAnswer().then(
      this.onCreateAnswerSuccess.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  onSetLocalSuccess(pc) {
    this.trace(this.getName(pc) + ' setLocalDescription complete');
  }

  onSetRemoteSuccess(pc) {
    this.trace(this.getName(pc) + ' setRemoteDescription complete');
  }

  onSetSessionDescriptionError(error) {
    this.trace('Failed to set session description: ' + error.toString());
  }

  gotRemoteStream(e) {
    if (this.remoteVideo.nativeElement.srcObject !== e.streams[0]) {
      this.remoteVideo.nativeElement.srcObject = e.streams[0];
      this.trace('pc2 received remote stream');
    }
  }

  onCreateAnswerSuccess(desc) {
    this.trace('Answer from pc2:\n' + desc.sdp);
    this.trace('pc2 setLocalDescription start');
    this.pc2.setLocalDescription(desc).then(
      () => {
        this.onSetLocalSuccess(this.pc2);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
    this.trace('pc1 setRemoteDescription start');
    this.pc1.setRemoteDescription(desc).then(
      () => {
        this.onSetRemoteSuccess(this.pc1);
      },
      this.onSetSessionDescriptionError.bind(this)
    );
  }

  onIceCandidate(pc, event) {
    this.getOtherPc(pc).addIceCandidate(event.candidate)
    .then(
      () => {
        this.onAddIceCandidateSuccess(pc);
      },
      (err) => {
        this.onAddIceCandidateError(pc, err);
      }
    );
    this.trace(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
        event.candidate.candidate : '(null)'));
  }

  onAddIceCandidateSuccess(pc) {
    this.trace(this.getName(pc) + ' addIceCandidate success');
  }

  onAddIceCandidateError(pc, error) {
    this.trace(this.getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  }

  onIceStateChange(pc, event) {
    if (pc) {
      this.trace(this.getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  hangup() {
    this.trace('Ending call');
    this.pc1.close();
    this.pc2.close();
    this.pc1 = null;
    this.pc2 = null;
    this.hangupButtonDisabled = true;
    this.callButtonDisabled = false;
  }

  trace(arg) {
    var now = (window.performance.now() / 1000).toFixed(3);
    console.log(now + ': ', arg);
  }

}
