function love.load()
  debug = 1
  debugnumber = 1

  player = {}
  player.x = 100
  player.y = 100
  player.canwalk = true
  player.face = "south"
  player.iswalking = false

end

function love.update(dt)

 if love.keyboard.isDown("right") then
  if player.canwalk == true then
    player.x = player.x + 8
    player.face = "east"
    player.iswalking = true
    else
      player.walking = false
  end
end

  if love.keyboard.isDown("left") then
    if player.canwalk == true then
      player.x = player.x - 8
      player.face = "west"
      player.iswalking = true
      else
      player.walking = false
  end
end

  if love.keyboard.isDown("up") then
    if player.canwalk == true then
      player.y = player.y - 8
      player.face = "north"
      player.iswalking = true
    else
      player.walking = false
    end
end

  if love.keyboard.isDown("down") then
    if player.canwalk == true then
      player.y = player.y + 8
      player.face = "south"
      player.iswalking = true
    else
      player.walking = false
  end
end

end

function love.draw()
  if debug == 1 then
    love.graphics.print(player.x, 0, 10)
    love.graphics.print(player.y, 0, 20)
    love.graphics.print(player.face, 0, 30)
    if player.iswalking == true then
      love.graphics.print("The player is walking", 0, 40)
    else
      love.graphics.print("the player is NOT walking", 0, 40)
    end
  end

  love.graphics.rectangle("fill", player.x, player.y, 100, 100)
end
