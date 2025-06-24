function love.load()
  sti = require 'lib/sti'
  camera = require 'lib/camera'
  anim8 = require 'lib/anim8'
  love.graphics.setDefaultFilter("nearest", "nearest")
  
  cam = camera()
  gameMap = sti('maps/world.lua')

  debug = 1

  player = {}
  player.x = 100
  player.y = 100
  player.face = "south"
  player.spriteSheet = love.graphics.newImage('sprites/hazzy.png')

  player.grid = anim8.newGrid(65, 64, player.spriteSheet:getWidth(), player.spriteSheet:getHeight())

  player.animations = {}
  player.animations.down = anim8.newAnimation(player.grid('1-2', 1), 0.2)
  player.animations.left = anim8.newAnimation(player.grid('1-2', 2), 0.2)
  player.animations.right = anim8.newAnimation(player.grid('1-2', 3), 0.2)
  player.animations.up = anim8.newAnimation(player.grid('1-2', 4), 0.2)

  player.anim = player.animations.left
end

function love.update(dt)
  local isMoving = false

  if love.keyboard.isDown("right") then
      player.x = player.x + 3
      player.face = "east"
      player.anim = player.animations.right
      isMoving = true
  end

  if love.keyboard.isDown("left") then
      player.x = player.x - 3
      player.face = "west"
      player.anim = player.animations.left
      isMoving = true
  end

  if love.keyboard.isDown("up") then
      player.y = player.y - 3
      player.face = "north"
      player.anim = player.animations.up
      isMoving = true
  end

  if love.keyboard.isDown("down") then
      player.y = player.y + 3
      player.face = "south"
      player.anim = player.animations.down
      isMoving = true
  end



  if isMoving == true then
    player.anim:update(dt)
  end

    cam:lookAt(player.x, player.y)

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
  if debug == 1 then
    love.graphics.print(player.x, 0, 10)
    love.graphics.print(player.y, 0, 20)
    love.graphics.print(player.face, 0, 30)
  end

  cam:attach()
    gameMap:drawLayer(gameMap.layers["brick"])
    gameMap:drawLayer(gameMap.layers["ground"])
    gameMap:drawLayer(gameMap.layers["building"])
    gameMap:drawLayer(gameMap.layers["tree"])

    player.anim:draw(player.spriteSheet, player.x, player.y, nil, 2)
  cam:detach()
end
