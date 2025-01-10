import * as ort from "onnxruntime-web";

const softmax = logits => {
	const max = Math.max(...logits); // Find the maximum value to improve numerical stability
	const exp = logits.map(logit => Math.exp(logit - max)); // Exponentiate logits
	const sum = exp.reduce((acc, value) => acc + value, 0); // Sum of the exponentiated values
	return exp.map(value => value / sum); // Normalize to get probabilities
};

const runONNXModel = async imageData => {
	try {
		// Load the ONNX model
		const session = await ort.InferenceSession.create(
			"/doodle_detection_model.onnx",
			{
				executionProviders: ["wasm"], // Explicitly set the WASM execution provider
			}
		);

		// Preprocess the input image (assuming imageData is a 2D array with shape [28, 28])
		const input = new Float32Array(imageData.flat()); // Flatten the 2D array into 1D array
		const tensor = new ort.Tensor("float32", [imageData], [1, 1, 28, 28]); // Shape: [batch, channels, height, width]

		// Run the model
		const feeds = { input: tensor };
		const results = await session.run(feeds);

		// Get the output tensor (assuming the model's output is named "output")
		const logits = results.output.data; // This is a 1D array with raw logits (before softmax)
		const probabilities = softmax(logits);
		const predictedClass = probabilities.indexOf(Math.max(...probabilities));

		// Return the predicted class and the probabilities
		return predictedClass;
	} catch (error) {
		console.error("Error running ONNX model:", error);
		return null;
	}
};

export default runONNXModel;
