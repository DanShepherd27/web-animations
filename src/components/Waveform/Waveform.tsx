import { useCallback, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Stage, Graphics, Sprite, Container } from "@pixi/react";

export function Waveform() {
  const first = useRef(true);
  const [tick, setTick] = useState(0);
  const width = 800;
  const height = 600;
  const fps = 30;

  const timeoutTicker = useCallback(() => {
    first.current = false;
    setTick((prevTick) => (prevTick === fps ? 0 : prevTick + 1));
    setTimeout(timeoutTicker, 1000 / fps);
  }, []);

  useEffect(() => {
    if (first.current) {
      setTimeout(timeoutTicker, 1000 / fps);
      first.current = false;
    }
  }, [first, timeoutTicker]);

  const drawSineWave = (g: PIXI.Graphics) => {
    const amplitude = 50; // Amplitude of the sine wave
    const frequency = 0.01 * tick; // Frequency of the sine wave

    g.clear();
    g.lineStyle(2, tick >= fps ? 0xff0000 : 0x000000, 1); // Red color, thickness, alpha
    g.moveTo(0, height / 2); // Start at the middle of the canvas

    // Draw the sine wave
    for (let x = 0; x <= width; x++) {
      const y = height / 2 + amplitude * Math.sin(frequency * x);

      g.lineTo(x, y);
    }
  };

  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";
  return (
    <Stage width={width} height={height} options={{ background: 0x1099bb }}>
      <Sprite
        image={bunnyUrl}
        x={
          fps % 2 === 0
            ? (width / fps) * tick - 30
            : (width / fps) * (tick - 1) - 30
        }
        y={0}
      />
      <Container angle={90} x={675} y={0}>
        <Graphics
          draw={drawSineWave}
          height={100}
          width={width}
          x={0}
          y={0}
        ></Graphics>
      </Container>
    </Stage>
  );
}
