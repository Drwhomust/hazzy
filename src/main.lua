function love.load()
    anim8 = require 'libraries/anim8'

    player = {}
    player.x = 400 -- starting point
    player.y = 200
    player.speed = 3 -- speed of player

    player.spritesheet = love.graphics.newImage('sprites/hazzy.png')
    player.grid = anim8.newGrid( 47, 61, player.spritesheet:getWidth(), player.spritesheet:getHeight() )

    player.animations = {}
    player.animations.down = anim8.newAnimation( player.grid('1-3', 1), 0.2 )
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