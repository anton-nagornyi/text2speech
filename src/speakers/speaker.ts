import {ISpeakerApi} from "./speakerApi";

export type SpeakerVoice = {
    language: string,
    name: string,
    gender: string
}

export class Speaker
{
    private constructor(language: string, api: ISpeakerApi)
    {
        this.language = language;
        this._api = api;
    }

    private _api: ISpeakerApi;
    private _voices?: Array<SpeakerVoice>;
    private _cache = new SpeakerCache();

    public readonly language: string;

    get voices(): ReadonlyArray<SpeakerVoice>
    {
        return this._voices ? this._voices : [];
    }

    static async create(language: string, api: ISpeakerApi): Promise<Speaker>
    {
        const speaker = new Speaker(language, api);
        await speaker.initialize();
        return speaker;
    }

    async speak(out: HTMLAudioElement, text: string, voice: SpeakerVoice, speed: number): Promise<void>
    {
        if (!this._cache.validate(text, voice, speed))
        {
            const data = await this._api.synthesize(text, voice, speed);
            const blob = new Blob([data], {type: 'audio/mp3'});
            this._cache.set(text, voice, speed, URL.createObjectURL(blob));
        }
        out.src = this._cache.url;
        console.log(out);
        await out.play();
    }

    private async initialize(): Promise<void>
    {
        this._voices = await this._api.getVoices(this.language);
    }
}

class SpeakerCache
{
    private _text = "";
    private _voice?: SpeakerVoice;
    private _speed = 0;
    private _url = "";

    get url(): string
    {
        return this._url;
    }

    set(text: string, voice: SpeakerVoice, speed: number, url: string)
    {
        this._text = text;
        this._voice = voice;
        this._speed = speed;
        this._url = url;
    }
    validate(text: string, voice: SpeakerVoice, speed: number): boolean
    {
        return text === this._text && voice === this._voice && speed === this._speed;
    }
}