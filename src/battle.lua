-- used for battle system
-- ! note, please try to keep everything is this script local
-- TODO fix this broken ahh script

function love.load()
    battle = false -- if you are in battle
    battleid = 1 -- who are your fighting

    local soul = {}
    local soul.x = 400
    local soul.y = 300
    local turn = false -- if it's your turn

    local choose = 1 -- what you will pick
    
    local boxtext = {}
    local boxtext.width = 500
    local boxtext.height = 400
end

function love.update(dt)
    if love.keyboard.isDown("right") then
        if turn == false then
            soul.x = soul.x + 200
        end
    choose = choose + 1
  end

    if love.keyboard.isDown("left") then
        if turn == false then
            soul.x = soul.x - 200
        end
        choose = choose - 1
end

    if love.keyboard.isDown("up") then
        if turn == false
            soul.y = soul.y - 200
    end
end

  if love.keyboard.isDown("down") then
    if turn == false then
    soul.y = soul.y + 200
    end
end

if choose == 0 then
    choose = 1
end

if choose == 5 then
    choose = 4
end
end

function love.draw()

end