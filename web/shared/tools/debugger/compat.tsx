import { useCallback } from 'preact/hooks'

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'center': JSX.HTMLAttributes<HTMLElement>
            'data-channel': JSX.HTMLAttributes<HTMLElement>;
            'debug-player': JSX.HTMLAttributes<HTMLElement>;
            'video-size-select': JSX.HTMLAttributes<HTMLElement>;
        }
    }
}

declare global {
    interface Window {
        refreshDevice(): Promise<void>;
        startWhip(): Promise<void>;
        startWhep(): Promise<void>;
    }
}

export default function DebuggerCompat() {
    const refreshDevice = useCallback(() => window.refreshDevice(), [])
    const startWhip = useCallback(() => window.startWhip(), [])
    const startWhep = useCallback(() => window.startWhep(), [])

    return (
        <>
            <fieldset>
                <legend>Common</legend>
                <section style="display: flex;justify-content: space-evenly;flex-wrap: wrap;">
                    <div>Stream ID: <input id="id" type="text" /></div>
                    <div>Bearer Token: <input id="token" type="text" /></div>
                </section>
            </fieldset>

            <div style="display: flex;justify-content: space-evenly;flex-wrap: wrap;">
                <fieldset>
                    <legend>WHIP</legend>
                    <center>
                        <section>
                            <button id="whip-device-button" onClick={refreshDevice}>Use Device</button>
                            <div style="margin: 0.2rem">Audio Device: <select id="whip-audio-device"><option value="">none</option></select></div>
                            <div style="margin: 0.2rem">Video Device: <select id="whip-video-device"><option value="">none</option></select></div>
                        </section>

                        <section>
                            Audio Codec: <select id="whip-audio-codec">
                                <option value="" selected>default</option>
                                <option value="opus/48000">OPUS</option>
                                <option value="g722/8000">G722</option>
                            </select>
                            Video Codec: <select id="whip-video-codec">
                                <option value="" selected>default</option>
                                <option value="av1/90000">AV1</option>
                                <option value="vp9/90000">VP9</option>
                                <option value="vp8/90000">VP8</option>
                                <option value="h264/90000">H264</option>
                            </select>
                        </section>
                        <section>
                            <video-size-select id="whip-video-size"></video-size-select>
                        </section>
                        <section>SVC Layer: <select id="whip-layer-select"></select></section>
                        <section>
                            <input type="checkbox" id="whip-pseudo-audio" />Pseudo Audio Track
                        </section>
                        <section>
                            <button onClick={startWhip}>Start</button>
                            <button id="whip-button-stop">Stop</button>
                        </section>

                        <section>
                            <h3>WHIP Video:</h3>
                            <debug-player controls autoplay id="whip-video-player"></debug-player>
                        </section>
                        <section>
                            <data-channel id="whip-datachannel"></data-channel>
                        </section>
                        <br />Logs: <br />
                        <div id="whip-logs"></div>
                    </center>
                </fieldset>

                <fieldset>
                    <legend>WHEP</legend>
                    <center>
                        <section>SVC Layer: <select disabled id="whep-layer-select"></select></section>
                        <section>
                            <button id="whep-button-disable-audio">Disable Audio</button>
                            <button id="whep-button-disable-video">Disable Video</button>
                        </section>
                        <section>
                            <button onClick={startWhep}>Start</button>
                            <button id="whep-button-stop">Stop</button>
                        </section>

                        <section>
                            <h3>WHEP Video:</h3>
                            <debug-player controls autoplay id="whep-video-player"></debug-player>
                        </section>
                        <section>
                            <data-channel id="whep-datachannel"></data-channel>
                        </section>
                        <br />Logs: <br />
                        <div id="whep-logs"></div>
                    </center>
                </fieldset>
            </div>
        </>
    )
}
