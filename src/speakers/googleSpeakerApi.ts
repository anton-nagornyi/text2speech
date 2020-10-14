import {SpeakerVoice} from "./speaker";
import {ISpeakerApi} from "./speakerApi";

type Voice = {
    "languageCodes": [
        string
    ],
    "name": string,
    "ssmlGender": string,
    "naturalSampleRateHertz": number
}

type VoiceList = {
    voices: Array<Voice>
}

export class GoogleSpeakerApi implements ISpeakerApi
{
    constructor(apiKey: string)
    {
        this._apiKey = apiKey;
    }

    private readonly _apiKey: string;

    async getVoices(language: string): Promise<SpeakerVoice[]>
    {
        const response = await fetch(`https://texttospeech.googleapis.com/v1beta1/voices?languageCode=${language}`, {
            method: "GET",
            headers: {
                "X-Goog-Api-Key": this._apiKey,
            }
        });
        const data = await response.json() as VoiceList;
        return data.voices.filter(v => v.name.startsWith(language)).map(v => ({name: v.name, language: language, gender: v.ssmlGender}));
    }

    async synthesize(text: string, voice: SpeakerVoice, speed: number): Promise<Buffer>
    {
        const response = await fetch("https://texttospeech.googleapis.com/v1beta1/text:synthesize", {
            method: "POST",
            headers: {
                "X-Goog-Api-Key": this._apiKey,
            },
            body: JSON.stringify({
                input: {
                    text: text
                },
                voice: {
                    languageCode: voice.language, ssmlGender: voice.gender, name: voice.name
                },
                audioConfig: {audioEncoding: "MP3", speakingRate: speed}
            })
        });
        const data = await response.json();
        return Buffer.from(data.audioContent, 'base64');
    }

}