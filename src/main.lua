function love.load()
    number = 1
end

function love.update(dt)
    number = number + 1
end

function love.draw()
    love.graphics.print(number)
    love.graphics.rectangle("fill", 100, 100, 200, 200)
end