/// @DnDAction : YoYo Games.Common.Variable
/// @DnDVersion : 1
/// @DnDHash : 45DDAC3D
/// @DnDArgument : "expr" "1"
/// @DnDArgument : "var" "face"
face = 1;

/// @DnDAction : YoYo Games.Common.If_Variable
/// @DnDVersion : 1
/// @DnDHash : 554F3DC7
/// @DnDArgument : "var" "face"
/// @DnDArgument : "value" "1"
if(face == 1){	/// @DnDAction : YoYo Games.Instances.Set_Sprite
	/// @DnDVersion : 1
	/// @DnDHash : 3B245801
	/// @DnDParent : 554F3DC7
	/// @DnDArgument : "spriteind" "spr_hazzy_front"
	/// @DnDSaveInfo : "spriteind" "spr_hazzy_front"
	sprite_index = spr_hazzy_front;
	image_index = 0;}