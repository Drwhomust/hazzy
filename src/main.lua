function love.load()
    player = {}
    player.x = 400 -- starting point
    player.y = 200
    player.speed = 3 -- speed of player
end

function love.update(dt)
    if love.keyboard.isDown("right") then -- if right key is held down then move right
        player.x = player.x + player.speed
    end

    if love.keyboard.isDown("left") then -- if left key is held down then move left
        player.x = player.x - player.speed
    end

    if love.keyboard.isDown("down") then -- if down key is held down then move down
        player.y = player.y + player.speed
    end

    if love.keyboard.isDown("up") then -- if up key is held down then move up
        player.y = player.y - player.speed
    end
end

function love.draw()
    love.graphics.circle("fill", player.x, player.y, 100)
end