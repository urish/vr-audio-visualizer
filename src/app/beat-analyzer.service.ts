import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// const beats = require('beats');

@Injectable()
export class BeatAnalyzerService {
  beat$ = new Subject<number>();
  analyser: AnalyserNode;

  constructor() { }

  async init() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    this.analyser = audioCtx.createAnalyser();
    const dataArray = new Float32Array(this.analyser.fftSize);
    let lastEvent = new Date().getTime();
    source.connect(this.analyser);

    const analyze = () => {
      this.analyser.getFloatTimeDomainData(dataArray);
      const samples = Array.from(dataArray).map(Math.abs);
      const avgPower = samples.reduce((x, y) => x + y) / samples.length;
      this.beat$.next(avgPower);
      lastEvent = new Date().getTime();
      requestAnimationFrame(analyze);
    };

    analyze();
  }
}
