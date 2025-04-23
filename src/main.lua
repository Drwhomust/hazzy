function love.load()
  debug = 1
  debugnumber = 1
end

function love.update(dt)
  if debug == 1 then
    debugnumber = debugnumber + 1
  end
end

function love.draw()
  if debug == 1 then
    love.graphics.print(debugnumber, 10, 200)
  end
end
