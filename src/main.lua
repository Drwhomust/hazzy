function love.load()
    anim8 = require 'libraries/anim8' -- for the sprites
    love.graphics.setDefaultFilter("nearest", "nearest") -- for scaling
    camera = require 'libraries/camera' -- for the cameara
    sti = require 'libraries/sti' -- maps (DO NOT TOUCH THIS)
    gameMap = sti('maps/testmap.lua') -- maps

    debugmode = 2 -- this is for debug mode. if set to 1 then it's disabled but if it's 2 then it's enabled

    cam = camera() -- for camera (DO NOT TOUCH)

    player = {}
    player.x = 400 -- starting point
    player.y = 200
    player.speed = 3 -- speed of player

    player.spritesheet = love.graphics.newImage('sprites/hazzy.png') -- gets hazzy's sprite file
    player.grid = anim8.newGrid( 60, 64, player.spritesheet:getWidth(), player.spritesheet:getHeight() ) -- tells what frames it should use

    player.animations = {} 
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

    cam:lookAt(player.x, player.y) -- makes camera look at hazzy

    -- all the code from 65 to 86 are all just to prevent the cameara from going into the void
    local w = love.graphics.getWidth()
    local h = love.graphics.getHeight()

    if cam.x < w/2 then
        cam.x = w/2
    end

    if cam.y < h/2 then
        cam.y = h/2
    end

    local mapW = gameMap.width * gameMap.tilewidth
    local mapH = gameMap.height * gameMap.tileheight

    if cam.x > (mapW - w/2) then
        cam.x = (mapW - w/2)
    end

    if cam.y > (mapH - h/2) then
        cam.y = (mapH - h/2)
    end
end

function love.draw()
    cam:attach() -- anything inside of this is going to be drawn in camera
        gameMap:drawLayer(gameMap.layers["Tile Layer 1"])
        gameMap:drawLayer(gameMap.layers["trees"])
        player.anim:draw(player.spritesheet, player.x, player.y, nil, 2, nil, 30, 32) -- hazzy (aka player)
    cam:detach()
end