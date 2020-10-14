import {SpeakerVoice} from "./speaker";

export interface ISpeakerApi
{
    synthesize(text: string, voice: SpeakerVoice, speed: number): Promise<Buffer>;
    getVoices(language: string): Promise<SpeakerVoice[]>;
}