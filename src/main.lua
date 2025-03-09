function love.load()
    player = {}
    player.x = 400
    player.y = 200
end

function love.update(dt)

end

function love.draw()
    love.graphics.circle("fill", player.x, player.y, 100)
end