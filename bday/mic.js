window.onload=function(){
    const heading = document.getElementById("start-button");
    heading?.addEventListener("click", init);
    var x = document.getElementById("song");
    let hasStartedPlaying = false;

    async function init() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const audioContext = new AudioContext();
        const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
        const analyserNode = audioContext.createAnalyser();
        mediaStreamAudioSourceNode.connect(analyserNode);

        const pcmData = new Float32Array(analyserNode.fftSize);
        const onFrame = () => {
            if (!hasStartedPlaying) { // Play audio only on the first frame
                x.loop = false;
                x.play();
                hasStartedPlaying = true;
            }
            analyserNode.getFloatTimeDomainData(pcmData);
            let sumSquares = 0.0;
            for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
            let volume = Math.sqrt(sumSquares / pcmData.length);
            document.getElementById("volumeMeter").value = volume;
            if(volume > 0.2) {
                document.getElementById("blow").textContent = "true";
                document.getElementById("candle1").classList.add("flame-out");
            } 
            window.requestAnimationFrame(onFrame);
        };
        window.requestAnimationFrame(onFrame);
    }

    async function test() {
        alert('Test');
        
    }
}