export default class Osc{
constructor(actx, type, frequency, detune, envelope, connection) {

this.actx = actx
this.envelope = envelope || {
    attack : 0.005,
    decay: 0.1,
    sustain : 0.6,
    release : 0.1
}
;
this.osc = actx.createOscillator()
this.osc.frequency.value = frequency;
this.osc.detune.value = detune;
this.osc.type = type;
// this.osc.connect(connection)
this.osc.start()




}

}