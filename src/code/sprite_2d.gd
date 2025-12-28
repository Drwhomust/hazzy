extends Sprite2D
@export var speed := 10
@onready var sprite_2d: Sprite2D = $"."


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("ready!")

# movement code
func _input(event: InputEvent) -> void:
	Movement(event) # calls in movement function and sends down event var down the line

func Movement(event):
	if event.is_action("right"): # if right move right
		var X = sprite_2d.position.x
		var Y = sprite_2d.position.y
		X = movement_where("Right", X)
		sprite_2d.position = Vector2(X, Y)
	else :
		if event.is_action("left"): # if left move left
			var X = sprite_2d.position.x
			var Y = sprite_2d.position.y
			X = movement_where("Left", X)
			sprite_2d.position = Vector2(X, Y)
		else :
			if event.is_action("down"): # if it's press down move down
				var X = sprite_2d.position.x
				var Y = sprite_2d.position.y
				Y = movement_where("Down", Y)
				sprite_2d.position = Vector2(X, Y)
			else:
				if event.is_action("up"): # if it's up then move up
					var X = sprite_2d.position.x
					var Y = sprite_2d.position.y
					Y = movement_where("Up", Y)
					sprite_2d.position = Vector2(X, Y)
					
func movement_where(der, XY):
	if der == "Right" or der == "Down": # checks if the key is right or down
		XY += speed # the X and Y of hazzy adds to go either right or down
	else:
		if der == "Left" or der == "Up": # checks if the key is left or up
			XY -= speed # the X and Y of hazzy Subtracks to go either Left or Up
	return XY
