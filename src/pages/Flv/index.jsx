/* eslint-disable */
import React, { useRef, useEffect, Fragment } from 'react';
// import 'xgplayer';
// import FlvPlayer from 'xgplayer-flv';

export default function Flv(props) {
    const myRef1 = useRef(null);
	const myRef2 = useRef(null);
	const myRef3 = useRef(null);
	const myRef4 = useRef(null);
	const myRef5 = useRef(null);
	const myRef6 = useRef(null);
	const myRef7 = useRef(null);
	const myRef8 = useRef(null);
	const myRef9 = useRef(null);
    const myRef10 = useRef(null);
    
    useEffect(() => {
		// const url = 'http://yunxianchang.live.ujne7.com/vod-system-bj/TLaf2cc9d469939803949187b46da16c45.flv';
		const url = 'https://zudapang.ltd/video/flv/xgplayer-demo-360p.flv';
		const player1 = new FlvJsPlayer({
			el: myRef1.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player2 = new FlvJsPlayer({
			el: myRef2.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player3 = new FlvJsPlayer({
			el: myRef3.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player4 = new FlvJsPlayer({
			el: myRef4.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player5 = new FlvJsPlayer({
			el: myRef5.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player6 = new FlvJsPlayer({
			el: myRef6.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player7 = new FlvJsPlayer({
			el: myRef7.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player8 = new FlvJsPlayer({
			el: myRef8.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player9 = new FlvJsPlayer({
			el: myRef9.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		const player10 = new FlvJsPlayer({
			el: myRef10.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		// player.start();
	}, []);

    return (
        <Fragment>
			<div ref={myRef1} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef2} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef3} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef4} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef5} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef6} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef7} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef8} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef9} className="flvplayer playback" style={{ float: 'left' }} />
			<div ref={myRef10} className="flvplayer playback" style={{ float: 'left' }} />
		</Fragment>
    );
}
