-- Put functions in this file to use them in several other scripts.
-- To get access to the functions, you need to put:
-- require "my_directory.my_file"
-- in any script using the functions.

local lib = {}

lib.string_seupere = function (string)
	for c in string.gmatch(string, ".") do return c end
end

lib.say_dialog = function (dialog, sound, object, mulisound)

	local engine_defelt_sound = "/assests/music/sfx/talking1.wav" -- Feel free to change this for your custom engine
	
	if dialog == nil then
		print("NO DIALOG INPUTED. PLEASE INPUT A STRING!!! >:#")
	else
		if sound == nil then
			print("No sound detected using " .. engine_defelt_sound)
		end
	end
end



return lib