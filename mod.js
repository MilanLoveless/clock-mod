const scribble = require('scribbletune');
const length = 3 * 5 * 7 * 16;

const threes = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 3 === 0);
const fives = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 5 === 0);
const sevens = [...Array(length).keys()].map((a) => a + 1).filter((a) => a % 7 === 0);
const final = Array.from(
  new Set(
    threes
      .concat(fives)
      .concat(sevens)
      .sort((a, b) => a - b)
  )
)
  .map((a, i) => (i % 2 == 0 ? null : a))
  .filter((a) => !!a);
console.log(final);

const pattern = [...Array(length).keys()].map((a) => (final.includes(a + 1) ? 'x' : '-')).join('');
console.log(pattern);

let prev = 0;
const gaps = final.reduce((g, i) => {
  g.push(i - prev);
  prev = i;
  return g;
}, []);

console.log(gaps);

// Create a clip that plays the middle C
const drum = scribble.clip({
  notes: 'c4',
  pattern,
});

// Render a MIDI file of this clip
scribble.midi(drum, 'drum.mid');

// Create a clip that plays the middle C
const bass = scribble.clip({
  notes: ['c4', 'f4', 'd4', 'g4'],
  pattern,
});

// Render a MIDI file of this clip
scribble.midi(bass, 'bass.mid');
