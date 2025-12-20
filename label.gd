extends Label


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("Hello World!")
	
func _input(event: InputEvent) -> void:
	if event.is_action("right"):
		print("going right")
		print($".".position)
