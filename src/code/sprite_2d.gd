extends Sprite2D
@export var speed := 5
@onready var sprite_2d: Sprite2D = $"."


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print("ready!")


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
