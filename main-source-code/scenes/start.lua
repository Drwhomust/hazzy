local scene = {}
local fire = require("/libs/hump/signal")
local waita = require("/libs/hump/timer")

function scene.load()
    side = 0
    song = love.audio.play("music/the_story.mp3")
    song_playing = false
end

function scene.update()
end