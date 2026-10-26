-- Put functions in this file to use them in several other scripts.
-- To get access to the functions, you need to put:
-- require "my_directory.my_file"
-- in any script using the functions.

local lib = {}

lib.string_seupere  = function (string)
	for c in string.gmatch(string, ".") do print(c) end
end

return lib