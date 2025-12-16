# phonetic-portrait

# Phonetic Portraits

A generative sound system that translates spoken language into music by analyzing phonetic structure rather than semantic meaning.

## Overview

This project uses real-time speech recognition to convert spoken words into a cohesive musical soundscape. 

## How It Works

1. **Speech Input**  
   Spoken language is captured using real-time speech recognition.

2. **Phonetic Analysis**  
   Each letter is gets a phonetic charactersitic.

   Version One: Percent on consonants in a word determines the sample track to be played. Number of vowels determine speed and duration of the sample track being played.
   Version Two: Each letter is classified by phonetic type (vowel, plosive, fricative, affricative, nasal, glide, liquid) and assigned characteristic frequency and duration values.

4. **Word Mapping**  
   Version Two:
   
   For each word
   - A weighted average of letter frequencies determines the musical note.
   - A weighted average of letter durations determines how long the note plays.
   - Notes are constrained to the C major pentatonic scale for cohesion.

6. **Sound Synthesis**  
   Version Two: Oscillators, envelopes, filtering, and reverb are used to generate and shape the sound in real time, with an ambient pad providing a continuous harmonic bed.

## Technologies

- p5.js  
- p5.SpeechRec  
- p5.Sound  
- Web Audio (oscillators, envelopes, filters)

## Running the Project

1. Clone the repository  
2. Serve the project locally (required for microphone access)
   ```bash
   python -m http.server
