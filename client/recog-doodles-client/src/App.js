import React, { useEffect, useRef, useState } from "react";
import runONNXModel from "./onnxModelHelper";

const class_names = [
	"The Eiffel Tower",
	"The Great Wall of China",
	"The Mona Lisa",
	"aircraft carrier",
	"airplane",
	"alarm clock",
	"ambulance",
	"angel",
	"animal migration",
	"ant",
	"anvil",
	"apple",
	"arm",
	"asparagus",
	"axe",
	"backpack",
	"banana",
	"bandage",
	"barn",
	"baseball",
	"baseball bat",
	"basket",
	"basketball",
	"bat",
	"bathtub",
	"beach",
	"bear",
	"beard",
	"bed",
	"bee",
	"belt",
	"bench",
	"bicycle",
	"binoculars",
	"bird",
	"birthday cake",
	"blackberry",
	"blueberry",
	"book",
	"boomerang",
	"bottlecap",
	"bowtie",
	"bracelet",
	"brain",
	"bread",
	"bridge",
	"broccoli",
	"broom",
	"bucket",
	"bulldozer",
	"bus",
	"bush",
	"butterfly",
	"cactus",
	"cake",
	"calculator",
	"calendar",
	"camel",
	"camera",
	"camouflage",
	"campfire",
	"candle",
	"cannon",
	"canoe",
	"car",
	"carrot",
	"castle",
	"cat",
	"ceiling fan",
	"cell phone",
	"cello",
	"chair",
	"chandelier",
	"church",
	"circle",
	"clarinet",
	"clock",
	"cloud",
	"coffee cup",
	"compass",
	"computer",
	"cookie",
	"cooler",
	"couch",
	"cow",
	"crab",
	"crayon",
	"crocodile",
	"crown",
	"cruise ship",
	"cup",
	"diamond",
	"dishwasher",
	"diving board",
	"dog",
	"dolphin",
	"donut",
	"door",
	"dragon",
	"dresser",
	"drill",
	"drums",
	"duck",
	"dumbbell",
	"ear",
	"elbow",
	"elephant",
	"envelope",
	"eraser",
	"eye",
	"eyeglasses",
	"face",
	"fan",
	"feather",
	"fence",
	"finger",
	"fire hydrant",
	"fireplace",
	"firetruck",
	"fish",
	"flamingo",
	"flashlight",
	"flip flops",
	"floor lamp",
	"flower",
	"flying saucer",
	"foot",
	"fork",
	"frog",
	"frying pan",
	"garden",
	"garden hose",
	"giraffe",
	"goatee",
	"golf club",
	"grapes",
	"grass",
	"guitar",
	"hamburger",
	"hammer",
	"hand",
	"harp",
	"hat",
	"headphones",
	"hedgehog",
	"helicopter",
	"helmet",
	"hexagon",
	"hockey puck",
	"hockey stick",
	"horse",
	"hospital",
	"hot air balloon",
	"hot dog",
	"hot tub",
	"hourglass",
	"house",
	"house plant",
	"hurricane",
	"ice cream",
	"jacket",
	"jail",
	"kangaroo",
	"key",
	"keyboard",
	"knee",
	"knife",
	"ladder",
	"lantern",
	"laptop",
	"leaf",
	"leg",
	"light bulb",
	"lighter",
	"lighthouse",
	"lightning",
	"line",
	"lion",
	"lipstick",
	"lobster",
	"lollipop",
	"mailbox",
	"map",
	"marker",
	"matches",
	"megaphone",
	"mermaid",
	"microphone",
	"microwave",
	"monkey",
	"moon",
	"mosquito",
	"motorbike",
	"mountain",
	"mouse",
	"moustache",
	"mouth",
	"mug",
	"mushroom",
	"nail",
	"necklace",
	"nose",
	"ocean",
	"octagon",
	"octopus",
	"onion",
	"oven",
	"owl",
	"paint can",
	"paintbrush",
	"palm tree",
	"panda",
	"pants",
	"paper clip",
	"parachute",
	"parrot",
	"passport",
	"peanut",
	"pear",
	"peas",
	"pencil",
	"penguin",
	"piano",
	"pickup truck",
	"picture frame",
	"pig",
	"pillow",
	"pineapple",
	"pizza",
	"pliers",
	"police car",
	"pond",
	"pool",
	"popsicle",
	"postcard",
	"potato",
	"power outlet",
	"purse",
	"rabbit",
	"raccoon",
	"radio",
	"rain",
	"rainbow",
	"rake",
	"remote control",
	"rhinoceros",
	"rifle",
	"river",
	"roller coaster",
	"rollerskates",
	"sailboat",
	"sandwich",
	"saw",
	"saxophone",
	"school bus",
	"scissors",
	"scorpion",
	"screwdriver",
	"sea turtle",
	"see saw",
	"shark",
	"sheep",
	"shoe",
	"shorts",
	"shovel",
	"sink",
	"skateboard",
	"skull",
	"skyscraper",
	"sleeping bag",
	"smiley face",
	"snail",
	"snake",
	"snorkel",
	"snowflake",
	"snowman",
	"soccer ball",
	"sock",
	"speedboat",
	"spider",
	"spoon",
	"spreadsheet",
	"square",
	"squiggle",
	"squirrel",
	"stairs",
	"star",
	"steak",
	"stereo",
	"stethoscope",
	"stitches",
	"stop sign",
	"stove",
	"strawberry",
	"streetlight",
	"string bean",
	"submarine",
	"suitcase",
	"sun",
	"swan",
	"sweater",
	"swing set",
	"sword",
	"syringe",
	"t-shirt",
	"table",
	"teapot",
	"teddy-bear",
	"telephone",
	"television",
	"tennis racquet",
	"tent",
	"tiger",
	"toaster",
	"toe",
	"toilet",
	"tooth",
	"toothbrush",
	"toothpaste",
	"tornado",
	"tractor",
	"traffic light",
	"train",
	"tree",
	"triangle",
	"trombone",
	"truck",
	"trumpet",
	"umbrella",
	"underwear",
	"van",
	"vase",
	"violin",
	"washing machine",
	"watermelon",
	"waterslide",
	"whale",
	"wheel",
	"windmill",
	"wine bottle",
	"wine glass",
	"wristwatch",
	"yoga",
	"zebra",
	"zigzag",
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

		// Resize to 28x28 and extract grayscale pixel data
		const smallCanvas = document.createElement("canvas");
		smallCanvas.width = 28;
		smallCanvas.height = 28;
		const smallCtx = smallCanvas.getContext("2d");
		smallCtx.drawImage(canvas, 0, 0, 28, 28);

		const imageData = smallCtx.getImageData(0, 0, 28, 28);
		const allZeros = imageData.data.every(item => item === 0);

		setContentOnCanvas(!allZeros);
	}, [drawingFlag]);

	// Drawing settings
	const startDrawing = e => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		canvas.isDrawing = true;
		setDrawingFlag(!drawingFlag);
	};

	const draw = e => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!canvas.isDrawing) return;

		ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		ctx.strokeStyle = "black";
		ctx.lineWidth = lineWidth;
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
		// const smallCanvas = document.createElement("canvas");
		// smallCanvas.width = 28;
		// smallCanvas.height = 28;
		// const smallCtx = smallCanvas.getContext("2d");
		// smallCtx.drawImage(canvas, 0, 0, 28, 28);

		const canvasContext = canvas.getContext("2d");

		const imageData = canvasContext.getImageData(0, 0, 28, 28);
		const data = [];

		// Extract grayscale pixel data
		for (let i = 0; i < imageData.data.length; i += 4) {
			const gray = imageData.data[i + 3]; // Take the alpha channel
			data.push(gray / 255.0); // Normalize to [0, 1]
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
				body: JSON.stringify({ input: [[tensorData]] }),
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

		// try {
		// 	const result = await runONNXModel(tensorData);
		// 	setPrediction(result);
		// } catch (error) {
		// 	console.error("Error running ONNX model:", error);
		// }
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
					width={28}
					height={28}
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
				<div className="flex mt-4">
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
