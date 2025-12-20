# btw can you keep everything in the code staic thnaks
extends Node2D
@export var debug_mode:= false
var time : = 600 # idk how long "once upon a time" is
@onready var story_text: RichTextLabel = $Story_Text

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var story_text_pos: = Vector2(221, 303)
	story_text.set_position(story_text_pos) # the game doesn't want to render it from the edtior, this is my only choice
	


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	time -= 1
	if debug_mode == true:
		print(str(time))
