-- Put functions in this file to use them in several other scripts.
-- To get access to the functions, you need to put:
-- require "my_directory.my_file"
-- in any script using the functions.

function get_story_text()
	local story_text = {
		"A long long time ago",
		"There was a cave with crytals",
		"They were very powerful..",
		"and were "
	}

	return story_text
end

return get_story_text()