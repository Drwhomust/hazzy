# btw can you keep everything in the code staic thnaks
extends Node2D
@export var debug_mode:= false
@export var debug_print_delta = false
var time : = 600 # idk how long "once upon a time" is
@onready var story_text: RichTextLabel = $Story_Text
@onready var once_upon_a_time: AudioStreamPlayer = $Once_Upon_a_Time
@onready var story_images: Sprite2D = $story_images


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var story_text_pos: = Vector2(218, 300)
	story_text.set_position(story_text_pos) # the game doesn't want to render it from the edtior, this is my only choice
	once_upon_a_time.play()
	

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if time >= 1:
		time -= 1
	if debug_mode == true:
		print(str(time))
		if debug_print_delta == true:
			print(delta) # only made this to make the edior shut up with errors
			
	if time == 200:
		story_images.texture = load("res://assets/sprites/temp_file.png")

func _input(event: InputEvent) -> void:
	if event.is_action("enter"): # skips the story
		skip_story()
		
func skip_story():
	once_upon_a_time.stop()
	get_tree().change_scene_to_file("res://scenes/name_your_goo.tscn")
