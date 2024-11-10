'use client';
import React from 'react';
import { Player } from '@lordicon/react';

import ICON from '../assets/liveicon.json';

function LiveTitle() {
  const playerRef = React.useRef<Player>(null);
  React.useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <div className="flex items-center gap-3">
      <h1 className="font-bold text-xl tracking-wide">Live Updates</h1>
      <div className="mt-2">
        <Player
          ref={playerRef}
          icon={ICON}
          onComplete={() => playerRef.current?.playFromBeginning()}
        />
      </div>
    </div>
  );
}

export default LiveTitle;
