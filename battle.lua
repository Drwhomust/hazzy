-- used for battle system
-- ! note, please try to keep everything is this script local

function love.load()
    battle = false
    battleid = 1

    local soul = {}
    local soul.x = 400
    local soul.y = 300

    local sectle = 1

    local barhit = 1
    
    local boxtext = {}
    local boxtext.width = 500
    local boxtext.height = 400

    local eme = "String"
end

function love.update(dt)
    if love.keyboard.isDown("right") then
      soul.x = soul.x + 200
  end

  if love.keyboard.isDown("left") then
      soul.x = soul.x - 200
  end

  if love.keyboard.isDown("up") then
      soul.y = soul.y - 200
  end

  if love.keyboard.isDown("down") then
      soul.y = soul.y + 200
  end
end

function love.draw()

end