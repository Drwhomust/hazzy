function love.load()
  sti = require 'lib/sti'
  camera = require 'lib/camera'
  love.graphics.setDefaultFilter("nearest", "nearest")
  
  cam = camera()
  gameMap = sti('maps/world.lua')

  debug = 1

  player = {}
  player.x = 100
  player.y = 100
  player.canwalk = true
  player.face = "south"
  player.spriteSheet = love.graphics.newImage('sprites/hazzy.png')
end

function love.update(dt)

  if love.keyboard.isDown("right") then
    if player.canwalk == true then
      player.x = player.x + 3
      player.face = "east"
  end
end

  if love.keyboard.isDown("left") then
    if player.canwalk == true then
      player.x = player.x - 3
      player.face = "west"
  end
end

  if love.keyboard.isDown("up") then
    if player.canwalk == true then
      player.y = player.y - 3
      player.face = "north"
    end
end

  if love.keyboard.isDown("down") then
    if player.canwalk == true then
      player.y = player.y + 3
      player.face = "south"
  end
end

  if love.keyboard.isDown("d") then
    if player.canwalk == true then
      player.x = player.x + 3
      player.face = "east"
  end
end

  if love.keyboard.isDown("a") then
    if player.canwalk == true then
      player.x = player.x - 3
      player.face = "west"
  end
end

  if love.keyboard.isDown("w") then
    if player.canwalk == true then
      player.y = player.y - 3
      player.face = "north"
    end
end

  if love.keyboard.isDown("s") then
    if player.canwalk == true then
      player.y = player.y + 3
      player.face = "south"
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

    love.graphics.rectangle("fill", player.x, player.y, 100, 100)
  cam:detach()
end
