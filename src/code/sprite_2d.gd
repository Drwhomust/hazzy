extends Sprite2D
@export var speed := 10
@onready var sprite_2d: Sprite2D = $"."


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("ready!")

# movement code
func _input(event: InputEvent) -> void:
	if event.is_action("right"):
		var X = sprite_2d.position.x
		var Y = sprite_2d.position.y
		X += speed
		sprite_2d.position = Vector2(X, Y)
	else :
		if event.is_action("left"):
			var X = sprite_2d.position.x
			var Y = sprite_2d.position.y
			X -= speed
			sprite_2d.position = Vector2(X, Y)
		else :
			if event.is_action("down"):
				var X = sprite_2d.position.x
				var Y = sprite_2d.position.y
				Y += speed
				sprite_2d.position = Vector2(X, Y)
			else:
				if event.is_action("up"):
					var X = sprite_2d.position.x
					var Y = sprite_2d.position.y
					Y -= speed
					sprite_2d.position = Vector2(X, Y)
