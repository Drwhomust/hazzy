function love.load()
  debug = 0 -- why the hell do we have a debug mode when it does nothing to debug
  debugnumber = 1

  player = {}
  player.x = 100
  player.y = 100
  player.canwalk = true
  player.face = "south"

end

function love.update(dt)
  if debug == 1 then
    debugnumber = debugnumber + 1
  end

 if love.keyboard.isDown("right") then
  if player.canwalk == true then
    player.x = player.x + 20
  end
end

if love.keyboard.isDown("left") then
if player.canwalk == true then
player.x = player.x - 20
end
end

  if love.keyboard.isDown("up") then
    if player.canwalk == true then
    player.x = player.y - 20
  end
end

end

function love.draw()
  if debug == 1 then
    love.graphics.print(debugnumber, 10, 200)
  end
end
