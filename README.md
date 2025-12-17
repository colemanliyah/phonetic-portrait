# Phonetic Portraits

Phonetic Portraits is a generative audio project that translates spoken language into sound by focusing on phonetic structure rather than semantic meaning. Speech becomes musical material, shaped by how words are articulated rather than what they mean.

## Overview

The system listens to spoken input in real time and produces an evolving soundscape based on the phonetic qualities of spoken words. Two different versions explore distinct strategies for mapping speech to sound: one sample-based and one synthesis-based.

## Project Versions

### Version One: Sample-Based Phonetic Mapping

This iteration uses pre-recorded samples to explore how basic phonetic structure can influence sound.

- Words are analyzed based on their vowel and consonant composition  
- The percentage of consonants in a word determines which sample track is triggered  
- The number of vowels influences the speed and duration of sample playback  

This version emphasizes rhythm and texture, treating speech as a pattern of soft and hard articulations.

### Version Two: Synthesis-Based Phonetic Mapping

This iteration generates sound directly using oscillators and envelopes driven by phonetic data.

- Letters are classified by phonetic type (vowel, plosive, fricative, affricative, nasal, glide, liquid)  
- Each phonetic group is assigned estimated frequency and duration values informed by linguistic literature and general phonetic conventions  
- For each word:
  - A weighted average of letter frequencies determines pitch  
  - A weighted average of letter durations determines note length  
- Notes are constrained to the C major pentatonic scale to maintain harmonic cohesion  

This version produces a continuous musical interpretation of speech that reflects phonetic texture rather than semantic meaning.

## How It Works

1. **Speech Input**  
   Spoken language is captured using real-time speech recognition.

2. **Phonetic Analysis**  
   Letters within each word are categorized based on phonetic characteristics.

3. **Sound Generation**  
   Depending on the version, phonetic data either triggers samples or drives synthesis using oscillators and envelopes.

4. **Audio Output**  
   Sound is generated and shaped in real time, creating an evolving soundscape that responds directly to speech.

## Technologies

- p5.js  
- p5.SpeechRec  
- p5.Sound  
- Web Audio API (oscillators, envelopes, filters)

## Running the Project

1. Open the project folder in Visual Studio Code  
2. Install a p5.js extension (such as **p5.vscode**)  
3. Use the extension’s **Build** or **Run** command to serve the project  
4. Open the generated local server in your browser and allow microphone access  

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
