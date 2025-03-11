function love.load()
    anim8 = require 'libraries/anim8' -- for the sprites

    time = 1 -- for timer
    debugmode = 2 -- this is for debug mode. if set to 1 then it's disabled but if it's 2 then it's enabled

    player = {}
    player.x = 400 -- starting point
    player.y = 200
    player.speed = 3 -- speed of player

    player.spritesheet = love.graphics.newImage('sprites/hazzy.png') -- gets hazzy's sprite file
    player.grid = anim8.newGrid( 60, 60, player.spritesheet:getWidth(), player.spritesheet:getHeight() ) -- tells what frames it should use

    player.animations = {} -- table for 13
    player.animations.down = anim8.newAnimation( player.grid('1-3', 1), 0.2 ) -- Animation timing
end

function love.update(dt)

    if love.keyboard.isDown("right") then -- if right key is held down then move right
        player.x = player.x + player.speed
    end

    if love.keyboard.isDown("left") then -- if left key is held down then move left
        player.x = player.x - player.speed
    end

    if love.keyboard.isDown("down") then -- if down key is held down then move down
        player.y = player.y + player.speed
    end

    if love.keyboard.isDown("up") then -- if up key is held down then move up
        player.y = player.y - player.speed
    end

    player.animations.down:update(dt)
end

function love.draw()
    player.animations.down:draw(player.spritesheet, player.x, player.y)
end