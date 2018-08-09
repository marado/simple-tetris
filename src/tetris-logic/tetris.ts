// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/simple-tetris

import {
  FrameHandler,
  ITerminalGameIo,
  KeypressHandler
} from 'terminal-game-io';

export const test = (): string => 'test';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

let posX = 5;
let posY = 0;

function setCharAt(input: string, index: number, char: string): string {
  if (index > input.length - 1) {
    return input;
  }

  return input.substr(0, index) + char + input.substr(index + 1);
}

export const keypressHandler: KeypressHandler = (instance: ITerminalGameIo, keyName: string) => {
  switch (keyName) {
    case 'down':
    case 'ArrowDown':
      posY = (posY + 1) % BOARD_HEIGHT;
      break;
    case 'up':
    case 'ArrowUp':
      posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
      break;
    case 'left':
    case 'ArrowLeft':
      posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
      break;
    case 'right':
    case 'ArrowRight':
      posX = (posX + 1) % BOARD_WIDTH;
      break;
    case 'escape':
    case 'Escape':
      instance.exit();
      break;
  }

  frameHandler(instance);
};

export const frameHandler: FrameHandler = (instance: ITerminalGameIo) => {
  let index: number;
  let frameData =
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<| . . . . . . . . . .|>' +
    '<|====================|>' +
    '  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/  ';

  index = posY * (2 * 10 + 2 * 2) + (2 + posX * 2);
  frameData = setCharAt(frameData, index, '[');
  frameData = setCharAt(frameData, index + 1, ']');

  instance.drawFrame(
    frameData,
    2 * 10 + 2 * 2,
    22
  );
};
