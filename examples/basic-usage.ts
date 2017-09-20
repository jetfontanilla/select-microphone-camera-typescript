import { BrowserMediaDevice } from "../src/browser-media-device";

let browserMediaDevices = new BrowserMediaDevice();

browserMediaDevices.getAudioInputList()
    .then(audioInputDevices => {
        console.log("detected audio devices", audioInputDevices);
        /*
            assuming the detected devices are:
            audioinput: default (Built-in Microphone) id=RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=
            audioinput: Built-in Microphone id=r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=
         */

        let builtInMicrophone = audioInputDevices[1]; // built-in mic
        browserMediaDevices.setAudioInput(builtInMicrophone); // set built-in mic as preffered source
    });

let startMicRecording = () => {
    let baseConstraints = {
        audio: true,
        video: false
    };

    let preferredDeviceConstraints = browserMediaDevices.getDeviceConstraints(baseConstraints);

    // start recording
    navigator.mediaDevices
        .getUserMedia(preferredDeviceConstraints)
        .then(stream => {
            console.log("Media stream", stream);

            // Web Audio processing here
            // see https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
        });
};
