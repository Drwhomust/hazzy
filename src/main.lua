function love.load()
    anim8 = require 'libraries/anim8' -- for the sprites
    love.graphics.setDefaultFilter("nearest", "nearest")
    camera = require 'libraries/camera'
    sti = require 'libraries/sti'
    gameMap = sti('maps/testmap.lua')

    debugmode = 2 -- this is for debug mode. if set to 1 then it's disabled but if it's 2 then it's enabled

    player = {}
    player.x = 400 -- starting point
    player.y = 200
    player.speed = 3 -- speed of player

    player.spritesheet = love.graphics.newImage('sprites/hazzy.png') -- gets hazzy's sprite file
    player.grid = anim8.newGrid( 60, 64, player.spritesheet:getWidth(), player.spritesheet:getHeight() ) -- tells what frames it should use

    player.animations = {} -- table for 13
    player.animations.down = anim8.newAnimation( player.grid('1-3', 1), 0.2 ) -- Animation timing
    player.animations.left = anim8.newAnimation( player.grid('1-3', 2), 0.2 ) 
    player.animations.right = anim8.newAnimation( player.grid('1-3', 3), 0.2 )
    player.animations.up = anim8.newAnimation( player.grid('1-3', 4), 0.2 )  

    player.anim = player.animations.left
end

function love.update(dt)
    local isMoving = false --checks to see if hazzy is moving

    if love.keyboard.isDown("right") then -- if right key is held down then move right
        player.x = player.x + player.speed
        player.anim = player.animations.right
        isMoving = true -- sets it so hazzy is moving
    end

    if love.keyboard.isDown("left") then -- if left key is held down then move left
        player.x = player.x - player.speed
        player.anim = player.animations.left
        isMoving = true -- sets it so hazzy is moving
    end

    if love.keyboard.isDown("down") then -- if down key is held down then move down
        player.y = player.y + player.speed
        player.anim = player.animations.down
        isMoving = true -- sets it so hazzy is moving
    end

    if love.keyboard.isDown("up") then -- if up key is held down then move up
        player.y = player.y - player.speed
        player.anim = player.animations.up
        isMoving = true -- sets it so hazzy is moving
    end

    player.anim:update(dt)

    if isMoving == false then -- this is when hazzy is not moving
        player.anim:gotoFrame(2) -- makes it that hazzy will stop walking
    end
end

function love.draw()
    gameMap:draw()
    player.anim:draw(player.spritesheet, player.x, player.y, nil, 2)
end