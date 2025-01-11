import React, { useEffect, useRef, useState } from "react";

const class_names = [
	"airplane",
	"apple",
	"arm",
	"banana",
	"baseball bat",
	"basket",
	"basketball",
	"bat",
	"beach",
	"bear",
	"bed",
	"bee",
	"bicycle",
	"bird",
	"book",
	"bottlecap",
	"brain",
	"bread",
	"bridge",
	"bucket",
	"bus",
	"bush",
	"cake",
	"camera",
	"candle",
	"car",
	"carrot",
	"cat",
	"chair",
	"clock",
	"cloud",
	"coffee cup",
	"compass",
	"cookie",
	"cup",
	"dog",
	"donut",
	"door",
	"duck",
	"ear",
	"elephant",
	"eye",
	"face",
	"fan",
	"flower",
	"foot",
	"fork",
	"frog",
	"garden hose",
	"guitar",
	"hamburger",
	"hammer",
	"hand",
	"hat",
	"headphones",
	"ice cream",
	"key",
	"knee",
	"laptop",
	"leaf",
	"light bulb",
	"lion",
	"lollipop",
	"mailbox",
	"map",
	"pencil",
	"penguin",
	"pig",
	"pillow",
	"pizza",
	"police car",
	"pool",
	"potato",
	"rabbit",
	"rain",
	"rainbow",
	"rake",
	"snowflake",
	"soccer ball",
	"spoon",
	"square",
	"star",
	"stop sign",
	"strawberry",
	"sun",
	"swan",
	"table",
	"teddy-bear",
	"telephone",
	"tent",
	"tree",
	"truck",
	"umbrella",
	"van",
	"vase",
	"washing machine",
	"watermelon",
	"whale",
];

const App = () => {
	const canvasRef = useRef(null);
	const [prediction, setPrediction] = useState(null);
	const [currentClass, setCurrentClass] = useState(
		class_names[Math.floor(Math.random() * class_names.length)]
	);
	const [lineWidth, setLineWidth] = useState(5);
	const [contentOnCanvas, setContentOnCanvas] = useState(false);
	const [drawingFlag, setDrawingFlag] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = 28;
		canvas.style.width = "500px";

		canvas.height = 28;
		canvas.style.height = "500px";
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;

		// Resize to 28x28 and extract grayscale pixel data
		// const smallCanvas = document.createElement("canvas");
		// smallCanvas.width = 28;
		// smallCanvas.height = 28;
		// const ctx = smallCanvas.getContext("2d");
		// ctx.drawImage(canvas, 0, 0, 28, 28);

		const ctx = canvas.getContext("2d");

		const imageData = ctx.getImageData(0, 0, 28, 28);
		const allZeros = imageData.data.every(item => item === 0);

		setContentOnCanvas(!allZeros);
	}, [drawingFlag]);

	// Drawing settings
	const startDrawing = e => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const scaleFactor = canvas.width / 500;
		ctx.beginPath();
		ctx.moveTo(
			e.nativeEvent.offsetX * scaleFactor,
			e.nativeEvent.offsetY * scaleFactor
		);
		canvas.isDrawing = true;
		setDrawingFlag(!drawingFlag);
	};

	const draw = e => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!canvas.isDrawing) return;

		const scaleFactor = canvas.width / 500;
		ctx.lineTo(
			e.nativeEvent.offsetX * scaleFactor,
			e.nativeEvent.offsetY * scaleFactor
		);
		ctx.strokeStyle = "black";
		ctx.lineWidth = lineWidth * scaleFactor; // Scale the line width as well
		ctx.lineCap = "round";
		ctx.stroke();
		setDrawingFlag(!drawingFlag);
	};

	const stopDrawing = () => {
		const canvas = canvasRef.current;
		canvas.isDrawing = false;
		setDrawingFlag(!drawingFlag);
	};

	const newDrawClass = () => {
		setCurrentClass(
			class_names[Math.floor(Math.random() * class_names.length)]
		);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		setDrawingFlag(!drawingFlag);
	};

	const predictCanvas = async () => {
		const canvas = canvasRef.current;

		// Resize to 28x28 and extract grayscale pixel data

		const ctx = canvas.getContext("2d");

		const imageData = ctx.getImageData(0, 0, 28, 28);
		const data = [];

		// Extract grayscale pixel data
		for (let i = 0; i < imageData.data.length; i += 4) {
			const gray = imageData.data[i + 3]; // Take the alpha channel
			data.push(1 - gray / 255.0); // Normalize to [0, 1]
		}

		const tensorData = [];
		for (let i = 0; i < 28; i++) {
			tensorData.push(data.slice(i * 28, (i + 1) * 28)); // Create 2D array [28x28]
		}

		console.log(tensorData);

		try {
			const response = await fetch("http://127.0.0.1:5000/predict", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input: [tensorData] }),
			});
			const data = await response.json();

			// Handle the prediction data
			if (data.prediction) {
				setPrediction(data.prediction);
			} else {
				console.error("Error:", data.error);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<header className="w-full h-20 flex items-center bg-cyan-500">
				<h1 className="max-w-screen-2xl w-full mx-auto flex headline-2">
					Draw and Guess Doodles!
				</h1>
			</header>
			<div className="flex flex-col items-center align0center justify-center mt-4">
				<div className="flex">
					<h2 className="max-w-max text-2xl lg:text-3xl font-semibold pb-4">
						Draw: {currentClass}
					</h2>
				</div>
				<canvas
					ref={canvasRef}
					width={500}
					height={500}
					className="block border-4 border-gray-400 rounded-lg shadow-lg bg-white"
					style={{ cursor: "crosshair" }}
					onMouseDown={startDrawing}
					onMouseMove={draw}
					onMouseUp={stopDrawing}
					onMouseOut={stopDrawing}
				></canvas>
				{prediction !== null && (
					<p>Predicted Class: {class_names[prediction]}</p>
				)}
				<div className="flex mt-2">
					{contentOnCanvas ? (
						<button onClick={predictCanvas} className="btn btn-secondary mx-2">
							<span>Predict</span>
							<span className="material-symbols-rounded">check</span>
						</button>
					) : (
						<button onClick={newDrawClass} className="btn btn-secondary mx-2">
							<span>Skip</span>
							<span className="material-symbols-rounded">skip_next</span>
						</button>
					)}

					<button onClick={clearCanvas} className="btn btn-secondary mx-2">
						<span>Clear</span>
						<span className="material-symbols-rounded">delete</span>
					</button>
					<div className="flex flex-col items-center space-y-2 mx-2">
						<label htmlFor="lineWidth" className="text-gray-700 font-medium">
							Line Width:{" "}
							<span className="font-bold text-blue-600">{lineWidth}</span>
						</label>
						<input
							id="lineWidth"
							type="range"
							min="1"
							max="50"
							value={lineWidth}
							onChange={e => setLineWidth(Number(e.target.value))}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
