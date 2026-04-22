local scene = {}
local fire = require("/libs/hump/signal")
local waita = require("/libs/hump/timer")

function scene.load()
    side = 0
    song = love.audio.newSource("music/the_story.mp3", "stream")
    song:play()
end

function scene.update()
end

function scene.draw()
end

return scene