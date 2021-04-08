import React, { useRef, useEffect, Fragment } from 'react';
// import 'xgplayer';
// import FlvPlayer from 'xgplayer-flv';

export default function Flv() {
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
		const url = 'https://zudapang.ltd/video/test.flv';
		const player = new window.FlvJsPlayer({
			el: myRef1.current,
			width: 300,
			height: 200,
			autoplay: false,
			isLive: false,
			url,
			playsinline: true,
		});
		player.start();
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
