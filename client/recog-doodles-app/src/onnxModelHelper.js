import * as ort from "onnxruntime-web";

const runONNXModel = async imageData => {
	try {
		// Load the ONNX model
		const session = await ort.InferenceSession.create(
			"/doodle_detection_model.onnx",
			{
				executionProviders: ["wasm"], // Explicitly set the WASM execution provider
			}
		);

		// Preprocess the input image (normalize to match model input requirements)
		const input = new Float32Array(imageData); // Assuming imageData is a preprocessed 1D array
		const tensor = new ort.Tensor("float32", input, [1, 1, 28, 28]); // Shape: [batch, channels, height, width]

		// Run the model
		const feeds = { input: tensor };
		const results = await session.run(feeds);

		// Get the output tensor (assuming the model's output is named "output")
		const output = results.output.data; // This is a 1D array with probabilities for each class

		// Find the class with the highest probability
		const predictedClass = output.indexOf(Math.max(...output));
		return predictedClass; // Return the predicted class
	} catch (error) {
		console.error("Error running ONNX model:", error);
		return null;
	}
};

export default runONNXModel;
