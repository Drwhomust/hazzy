# btw can you keep everything in the code staic thnaks
extends Node2D
@export var debug_mode:= false
@export var debug_print_delta: = false
var fullscreen: = false
var time : = 0 # idk how long "once upon a time" is
@onready var story_text: Label = $Story_text
@onready var once_upon_a_time: AudioStreamPlayer = $Once_Upon_a_Time
@onready var story_images: Sprite2D = $story_images
# side note as a roblox dev, @onready is just :WaitForChild()
# please ref Godot docs for more info


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var story_text_pos: = Vector2(212, 300)
	var story_img_pos: = Vector2(320, 160)
	story_text.set_position(story_text_pos) # the game doesn't want to render it from the edtior, this is my only choice
	story_images.set_position(story_img_pos) # same here
	story_text.text = "A long time ago
	A lab underground used to
	mine for a crystal"
	once_upon_a_time.play()
	if OS.get_name() == "Web":
		$web_warning.visible = true
	else:
		$web_warning.visible = false
	

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if time >= 0:
		time += 1
	progress_story() # runs this function every frame to check if it should progress the story
	if debug_mode == true: # if the debug mode is true then print the time where the song is playing (should be in sync)
		print(str(time))
		if debug_print_delta == true:
			print(delta) # only made this to make the edior shut up with errors
	

func _input(event: InputEvent) -> void:
	if event.is_action("enter"): # skips the story
		once_upon_a_time.stop()
		get_tree().change_scene_to_file("res://scenes/name_your_goo.tscn") # Goes to scene where player get's to name them selfs before they start the game
		
	if event.is_action("fullscreen"): # checks if the input is fullscreen
		fullscreen_game() # if so runs function

func progress_story(): # this changes the image and text of the story at the beggaing
	if time == 0:
		pass # do nothing when it starts (it's already setup)
	else:
		if time == 680:
			story_images.texture = load("res://assets/sprites/temp_file.png")
			story_text.text = "These crystals had the
			abitly to change 
			the human DNA to a animal"
		else:
			if time == 1180:
				story_images.texture = load("res://assets/sprites/temp_file.png")
				story_text.text = "This procress was called..."
			else:
				if time == 1550:
					story_images.texture = load("res://assets/sprites/temp_file.png")
					story_text.text = "Transfur"
				else:
					if time == 1790:
						story_images.texture = load("res://assets/sprites/temp_file.png")
						story_text.text = "The goo would cover up
						the host and turn it 
						into an human hybrid animal"
					else:
						if time == 2380:
							story_images.texture = load("res://assets/sprites/temp_file.png")
							story_text.text = "However..."
						else:
							if time == 2600:
								story_images.texture = load("res://assets/sprites/temp_file.png")
								story_text.text = "People lost control over 
								their minds and soul
								once they got transfur"
							if time == 3099:
								story_images.texture = load("res://assets/sprites/temp_file.png")
								story_text.text = "Even though the goos wanted peace
								and to live with humans in harmony"
							else:
								if time == 3535:
									story_images.texture = load("res://assets/sprites/temp_file.png")
									story_text.text = "The humans said no for some
									reason..."
								else:
									if time == 3930:
										story_images.texture = load("res://assets/sprites/temp_file.png")
										story_text.text = "So the humans locked down the place
										to keep everyone safe"
									else:
										if time == 4330:
											story_images.texture = null
											story_text.text = "Years later..."
										else:
											if time == 4630:
												story_images.texture = load("res://assets/sprites/temp_file.png")
												story_text.text = "202X
												Dr. Assmen"
											else:
												if time == 5000:
													story_images.texture = load("res://assets/sprites/temp_file.png")
													story_text.text = "One day he went out to get samples
													until..."
												else:
													if time == 5525:
														story_images.texture = load("res://assets/sprites/temp_file.png")
														story_text.text = "..."
													# no more text from here pleasez

func fullscreen_game(): # fullscreens the game
	if fullscreen == false: # if it is false
		DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN) # sets mode to fullscreen
		fullscreen = true # it also changes the var
	else:
		if fullscreen == true: # if it is fullscreen
			DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED) # then it sets it to windo
			fullscreen = false # sets it to false
	
