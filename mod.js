const scribble = require('scribbletune');
const length = 32 * 16;

const twos = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 2 === 0);
const threes = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 3 === 0);
const fives = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 5 === 0);
const sevens = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 7 === 0);
const fours = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 8 === 1);
const eights = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 8 === 1);
const altEights = [...Array(length).keys()].map((a) => a + 1).filter((a) => (a - 4) % 8 === 1);

// Basic Pattern

const finalBasic = Array.from(
  new Set(
    threes
      .concat(fives)
      .concat(sevens)
      .sort((a, b) => a - b)
  )
)
  .map((a, i) => (i % 2 === 0 ? null : a))
  .filter((a) => !!a);

const basicPattern = [...Array(length).keys()].map((a) => (finalBasic.includes(a + 1) ? 'x' : '-')).join('');
console.log('Basic:');
console.log(basicPattern);

// Create a clip that plays the middle C
const basic = scribble.clip({
  notes: 'c4',
  pattern: basicPattern,
});

// Render a MIDI file of this clip
scribble.midi(basic, 'basic.mid');

// Kick Pattern

const kickAccents = Array.from(new Set(fives.concat(sevens).sort((a, b) => a - b)))
  .map((a, i) => (i % 2 === 0 ? null : a))
  .filter((a) => !!a);

const kickFinal = Array.from(new Set(eights.concat(kickAccents).sort((a, b) => a - b)));
const kickPattern = [...Array(length).keys()]
  .map((a) => {
    if (kickFinal.includes(a + 1)) {
      if ((a + 5) % 8 === 1) {
        return '-';
      }
      return 'x';
    }
    return '-';
  })
  .join('');

console.log('Kick:');
console.log(kickPattern);

// Create a clip that plays the middle C
const kick = scribble.clip({
  notes: 'c4',
  pattern: kickPattern,
  accent: 'x-------',
});

// Render a MIDI file of this clip
scribble.midi(kick, 'kick.mid');

// Snare Pattern
const snareAccents = Array.from(new Set(fives.concat(sevens).sort((a, b) => a - b)))
  .map((a, i) => (i % 2 === 1 ? null : a))
  .filter((a) => !!a);

const snareFinal = Array.from(new Set(altEights.concat(snareAccents).sort((a, b) => a - b)));
const snarePattern = [...Array(length).keys()]
  .map((a) => {
    if (snareFinal.includes(a + 1)) {
      if ((a + 4) % 8 === 1) {
        return '-';
      }
      return 'x';
    }
    return '-';
  })
  .join('');

console.log('Snare:');
console.log(snarePattern);

// Create a clip that plays the middle C
const snare = scribble.clip({
  notes: 'c4',
  pattern: snarePattern,
  accent: '----x---',
});

// Render a MIDI file of this clip
scribble.midi(snare, 'snare.mid');

// Hats

// const finalhats = Array.from(new Set(threes.concat(twos).sort((a, b) => a - b)))
//   .map((a, i) => (i % 2 === 1 ? null : a))
//   .filter((a) => !!a)
//   .filter((a) => a % 4 !== 1);
// const hatsPattern = [...Array(length).keys()].map((a) => (finalhats.includes(a + 1) ? 'x' : '-')).join('');

// console.log('Hats:');
// console.log(hatsPattern);

// Create a clip that plays the middle C
const hats = scribble.clip({
  notes: 'c4',
  pattern: '--x-',
  accent: '--x-',
});

// Render a MIDI file of this clip
scribble.midi(hats, 'hats.mid');

// Bass

const finalBass = Array.from(new Set(finalBasic.concat(fours).sort((a, b) => a - b)));
const bassPattern = [...Array(length).keys()].map((a) => (finalBass.includes(a + 1) ? 'x' : '-')).join('');

console.log('Bass:');
console.log(bassPattern);

// Create a clip that plays the middle C
const bass = scribble.clip({
  notes: ['c4', 'f4', 'd4', 'g4'],
  pattern: bassPattern,
});

// Render a MIDI file of this clip
scribble.midi(bass, 'bass.mid');

// Arp
const finalArp = finalBass;
const arpPattern = [...Array(length).keys()].map((a) => (finalArp.includes(a + 1) ? 'xxxxxxx-' : '-------')).join('');

console.log('Arp:');
console.log(arpPattern);

// Create a clip that plays the middle C
const arp = scribble.clip({
  notes: scribble.arp({ chords: 'Cmaj7-4 Fmaj7-4 Dmin7-4 Gmaj7-4', order: '0123210', subdiv: '16n' }),
  pattern: arpPattern,
});

// Render a MIDI file of this clip
scribble.midi(arp, 'arp.mid');

// Chords
const finalChord = finalBass;
const chordPattern = [...Array(length).keys()].map((a) => (finalChord.includes(a + 1) ? 'x' : '-')).join('');

console.log('Chord:');
console.log(chordPattern);

// Create a clip that plays the middle C
const chord = scribble.clip({
  notes: ['CM', 'FM', 'Dm', 'GM'],
  pattern: chordPattern,
});

// Render a MIDI file of this clip
scribble.midi(chord, 'chord.mid');
