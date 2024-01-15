import { DevTool } from '@excaliburjs/dev-tools';
import { Actor, CollisionType, Color, Engine, vec } from 'excalibur';

// [CREATE_GAME]
const game = new Engine({
  width: 400,
  height: 400,
});

// [CREATE_GAME_ACTORS]
const paddle = create_paddle();
const ball = create_ball();
const bricks = create_bricks();

// [ADD_ACTORS_TO_GAME]
game.add(paddle);
game.add(ball);
bricks.forEach((brick) => game.add(brick));

// [SETUP_PLAYER_CONTROLS]
game.input.pointers.primary.on('move', (e) => {
  paddle.pos.x = e.worldPos.x;
});

//
function create_bricks() {
  const padding = 20;
  const offset_x = 45;
  const offset_y = 20;

  const columns = 5;
  const rows = 3;

  const brickColor = [Color.Viridian, Color.Orange, Color.Vermilion];

  const brick_width = game.drawWidth / columns - padding - padding / columns;
  const brick_height = 10;
  const bricks: Actor[] = [];

  // DYNAMIC BRICKS
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = offset_x + col * (brick_width + padding);
      const y = offset_y + row * (brick_height + padding);
      const width = brick_width;
      const height = brick_height;
      const color = brickColor[row];
      //
      const brick = new Actor({ x, y, width, height, color });
      brick.body.collisionType = CollisionType.Active;
      bricks.push(brick);
    }
  }

  return bricks;
}
function create_ball() {
  const ball = new Actor({
    x: 100,
    y: 100,
    radius: 10,
    color: Color.White,
  });
  const ball_speed = vec(200, -200);
  ball.vel = ball_speed;

  // collision setup
  ball.body.collisionType = CollisionType.Passive;

  // EVENTS
  ball.on('postupdate', () => {
    const hit_limits = {
      screen_top: ball.pos.y - ball.height / 2 < 0,
      screen_left: ball.pos.x - ball.width / 2 < 0,
      screen_right: ball.pos.x + ball.width / 2 > game.drawWidth,
    };

    if (hit_limits.screen_left) {
      // send to the right
      ball.vel.x = ball_speed.x + Math.random();
    }
    if (hit_limits.screen_right) {
      // send to the left
      ball.vel.x = ball_speed.x * -1 + Math.random();
    }
    if (hit_limits.screen_top) {
      // send to bottom
      ball.vel.y = ball.vel.y = ball_speed.y * -1 + Math.random();
    }
  });

  let colliding = false;

  // destroy bricks
  ball.on('collisionstart', (e) => {
    const collide_with_brick = bricks.indexOf(e.other) > -1;
    if (collide_with_brick) {
      e.other.kill();
    }

    if (!colliding) {
      colliding = true;
      const intersection = e.contact.mtv.normalize();
      const hit_x = Math.abs(intersection.x) > Math.abs(intersection.y);

      if (hit_x) {
        // reverse x
        ball.vel.x *= -1;
      } else {
        // reverse y
        ball.vel.y *= -1;
      }
    }
  });
  ball.on('collisionend', () => {
    colliding = false;
  });
  ball.on('exitviewport', () => {
    console.warn('you lose');
  });

  return ball;
}
function create_paddle() {
  const paddle = new Actor({
    x: 100,
    y: game.drawHeight - 20,
    width: 100,
    height: 20,
    color: Color.ExcaliburBlue,
  });
  // collision setup
  paddle.body.collisionType = CollisionType.Fixed;
  return paddle;
}

//
export const breakout_game = {
  game,
  start_game: (debug = true) => {
    if (debug) new DevTool(game);

    game.start();
  },
};
