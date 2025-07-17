--[[
 * Hello and welcome to the code of hazzy!!!

 * before you start. sorry for messy code!
 * Make sure you know what you are doing (read the hazzy wiki if you don't)

 * And HAVE FUN!!
 * don't tranfur your self!

 game was made by Drwhomust the therian :3

 ! NOTE FOR VSCODE USERS
 * Please install the extensions in the "extensions.json file"
 * it will make it easy to code the game!
]]
function love.load()
  wf = require 'lib/windfield'
  sti = require 'lib/sti'
  camera = require 'lib/camera' -- ! This library may break
  anim8 = require 'lib/anim8'
  love.graphics.setDefaultFilter("nearest", "nearest")

  world = wf.newWorld(0, 0)

  Font = love.graphics.newFont("8bitoperator_jve.ttf")
  love.graphics.setFont(Font)

  
  cam = camera()
  gameMap = sti('maps/world.lua')

  debug = 0 -- enabled or disbales debug mode

  if debug == 1 then
    print("DEBUG MODE IS ENABLED")
    print("USE AT YOUR OWN RISK!!!")
  end

  local OS = love.system.getOS() -- sets OS var. will be used to make 4th wall breaking
  local fullscreensupport = false

  if OS == "OS X" then
    print("HAZZY NO LONGER HAS SUPPORT FOR MACOS DUE TO APPLE RESCTIONS")
    print("TO PLAY HAZZY ON MACOS PLEASE BUILD THE GAME FROM SOURCE AND REMOVE LINES 42-47 IN MAIN.LUA")
    print("I AM SORRY BUT IT'S NOT MY CHOICE")
    love.event.quit()
  end

  player = {}
  player.collirder = world:newBSGRectangleCollider(400, 400, 75, 122, 10)
  player.collirder:setFixedRotation(true)
  player.x = 400 -- kinda useless (both x and y)
  player.y = 400
  player.face = "south" -- used for making hazzy face
  player.spriteSheet = love.graphics.newImage('sprites/hazzy.png')

  -- ! no touch the animations stuff. it breaks very easy
  player.grid = anim8.newGrid(65, 64, player.spriteSheet:getWidth(), player.spriteSheet:getHeight())

  player.animations = {} 
  player.animations.down = anim8.newAnimation(player.grid('1-2', 1), 0.2)
  player.animations.left = anim8.newAnimation(player.grid('1-2', 2), 0.2)
  player.animations.right = anim8.newAnimation(player.grid('1-2', 3), 0.2)
  player.animations.up = anim8.newAnimation(player.grid('1-2', 4), 0.2)

  player.anim = player.animations.left

  print("Done loading! :3 owo") -- gets printed when it is done loading this crap
end

function love.update(dt)
  local isMoving = false
  local vx = 0
  local vy = 0

  if love.keyboard.isDown("right") then
      vx = vx + 300
      player.face = "east"
      player.anim = player.animations.right
      isMoving = true
  end

  if love.keyboard.isDown("left") then
      vx = vx - 300
      player.face = "west"
      player.anim = player.animations.left
      isMoving = true
  end

  if love.keyboard.isDown("up") then
      vy = vy - 300
      player.face = "north"
      player.anim = player.animations.up
      isMoving = true
  end

  if love.keyboard.isDown("down") then
      vy = vy + 300
      player.face = "south"
      player.anim = player.animations.down
      isMoving = true
  end

  if love.keyboard.isDown("escape") then
    love.event.quit()
  end

  if OS == "Windows" then
    if love.keyboard.isDown("f4") then
      if fullscreensupport == false then
        love.window.setFullscreen(true, desktop)
      else
        love.window.setFullscreen(false, desktop)
      end
    end
  end

    walls = {}
  if gameMap.layers["walls"] then
    for i, obj in pairs(gameMap.layers["walls"].objects) do
      local wall = world:newRectangleCollider(obj.x, obj.y, obj.width, obj.height)
      wall:setType('static')
      table.insert(walls, wall)
    end
  end

  player.collirder:setLinearVelocity(vx, vy)

  world:update(dt)
  player.x = player.collirder:getX()
  player.y = player.collirder:getY()

  if isMoving == true then
    player.anim:update(dt)
  end

    cam:lookAt(player.x, player.y) -- makes the camera look at the player

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
  cam:attach()
    gameMap:drawLayer(gameMap.layers["Background"])
    gameMap:drawLayer(gameMap.layers["Ground1"])
    gameMap:drawLayer(gameMap.layers["Ground2"])
    gameMap:drawLayer(gameMap.layers["Ground3"])
    gameMap:drawLayer(gameMap.layers["Decore1"])
    gameMap:drawLayer(gameMap.layers["Decore2"])
    gameMap:drawLayer(gameMap.layers["Decore3"])
    gameMap:drawLayer(gameMap.layers["Decore4"])
    gameMap:drawLayer(gameMap.layers["Decore5"])
    gameMap:drawLayer(gameMap.layers["Decore6"])
    gameMap:drawLayer(gameMap.layers["Decore7"])
  -- ! The render is only able to support up to 7, do not use
  -- ! the 8, 9, 10 layer in tiled and the map template

    player.anim:draw(player.spriteSheet, player.collirder:getX() - 60, player.collirder:getY() - 60, nil, 2) -- ! no touch please

    if debug == 1 then
      world:draw() -- this shows hitboxes
      -- * note this can get ugly
    end
  cam:detach()

    if debug == 1 then -- displays debug crap :3
    love.graphics.print(player.x, 0, 10)
    love.graphics.print(player.y, 0, 20)
    love.graphics.print(player.face, 0, 30)
  end
end
