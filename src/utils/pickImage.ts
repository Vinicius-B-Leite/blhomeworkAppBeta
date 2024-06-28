import * as ImagePicker from "expo-image-picker"

export async function pickImage(props?: { allowsEditing?: boolean }) {
	const allowsEditing = props?.allowsEditing === undefined ? true : props.allowsEditing
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: allowsEditing,
		aspect: [4, 3],
		quality: 1,
		selectionLimit: 1,
		base64: true,
	})

	if (result.assets && result.assets[0].uri && result.assets[0].base64) {
		return result.assets[0]
	}
}
