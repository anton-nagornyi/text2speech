import * as React from "react";
import {useEffect, useState} from "react";
import {Speaker} from "../speakers/speaker";
import {GoogleSpeakerApi} from "../speakers/googleSpeakerApi";
import {usePlayerDataState} from "../context/playerDataContext";
import styled from 'styled-components';
import {ButtonStop} from "./buttonStop";
import {ButtonPlay} from "./buttonPlay";
import {ErrorMessage} from "./errorMessage";

type PlayerProps = {
    text: string
}

export const Player: React.FC<PlayerProps> = (props) =>
{
    const [isPlaying, setIsPlaying] = useState(false);
    const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined);
    const [speed, setSpeed] = useState(1);
    const [voiceIndex, selectVoice] = useState(0);
    let [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
    const playerContext = usePlayerDataState();

    useEffect(() => {
        const initializeSpeaker = async () =>
        {
            try
            {
                const speaker = await Speaker.create("en-US", new GoogleSpeakerApi("AIzaSyBUrG7YyqBHH-TcgwACamVt3mlNU2u5dR4"));
                setSpeaker(speaker);
            }
            catch (e)
            {
                ErrorMessage.error("Could not initialize speaker");
            }
        };
        initializeSpeaker();
    }, []);

    if (speaker)
    {
        return (
            <PlayerStyled>
                {!isPlaying ? <ButtonPlay onClick={async () => {
                    console.log(playerContext.textToSay, !playerContext.textToSay);
                    if (!playerContext.textToSay)
                    {
                        ErrorMessage.error("Nothing to play");
                        return;
                    }

                    if (!audio)
                    {
                        audio = new Audio();
                        audio.onended = () => setIsPlaying(false);
                        setAudio(audio);
                    }
                    setIsPlaying(true);
                    await speaker.speak(audio, playerContext.textToSay, speaker.voices[voiceIndex], speed);
                }}/>
                : <ButtonStop onClick={() => {audio!.pause(); setIsPlaying(false);}}>Stop</ButtonStop>
                }
                <Select style={{minWidth: 200}} value={voiceIndex} onChange={v => selectVoice(parseInt(v.target.value))}>
                    {speaker.voices.map((v, index) => <option key={index} value={index}>{v.name}</option>)}
                </Select>
                <Select value={speed} onChange={v => setSpeed(parseFloat(v.target.value))}>
                    <option value={0.25}>Speed 0.25</option>
                    <option value={0.5}>Speed 0.5</option>
                    <option value={1}>Speed 1</option>
                    <option value={2}>Speed 2</option>
                    <option value={4}>Speed 4</option>
                </Select>
            </PlayerStyled>);
    }
    return <div/>;
};


const PlayerStyled = styled.div`
    display: grid;
    gap: 16px;
    grid-template-columns: 50px 1fr 115px;
`;

const Select = styled.select`
    border: #E0E0E0 solid 1px;
    border-radius: 25px;
    padding-left: 16px;
    padding-right: 16px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAQAAACWu2SvAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkCg4OEjchuWRwAAAAQElEQVQI14XNQQqAIABE0Xch1yoUGHn/e6iXaFciUX81MPwZPgninaPwFElXQNGl2dk1h01zrnPVMNS3pyz75wI5Igks3rI6PAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMC0xNFQxNDoxODo1NSswMDowMK9b72cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTAtMTRUMTQ6MTg6NTUrMDA6MDDeBlfbAAAAAElFTkSuQmCC) no-repeat;
    background-position: right 16px top 50%;
    -moz-appearance: none; 
    -moz-appearance: none; 
    -webkit-appearance: none; 
    appearance: none;
    &:focus {
      outline: none;
    }
`;
