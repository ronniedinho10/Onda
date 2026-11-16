// Mono 16 kHz PCM, averaged downsampling with fractional phase retained across blocks.
class OndaCaptionPCM extends AudioWorkletProcessor {
 constructor(){super();this.sum=0;this.count=0;this.phase=0;this.frames=[];this.ratio=sampleRate/16000;}
 process(inputs){const channels=inputs[0];if(!channels?.length)return true;for(let i=0;i<channels[0].length;i++){let sample=0;for(const channel of channels)sample+=channel[i]/channels.length;this.sum+=sample;this.count++;this.phase++;if(this.phase>=this.ratio){this.phase-=this.ratio;const value=Math.max(-1,Math.min(1,this.sum/this.count));this.frames.push(Math.round(value*(value<0?32768:32767)));this.sum=0;this.count=0;}if(this.frames.length>=2048){const bytes=new ArrayBuffer(4096),view=new DataView(bytes);for(let j=0;j<2048;j++)view.setInt16(j*2,this.frames[j],true);this.port.postMessage(bytes,[bytes]);this.frames=[];}}return true;}
}
registerProcessor('onda-caption-pcm',OndaCaptionPCM);
