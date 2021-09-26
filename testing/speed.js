const { useEffect, useMemo, useRef, useState, useCallback } = React;

let queryImages = [];
let controller;

const Main = () => {
  const [numRun, setNumRun] = useState(10);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const init = async () => {
      //for (let i = 11; i <= 15; i+=1) {
//	queryImages.push(await utils.loadImage('../tests/video2/out' + i + '.png'));
      //}
      //queryImages.push(await utils.loadImage('../tests/video2/out01_540.png'));
      //queryImages.push(await utils.loadImage('../tests/video2/out01_540.png'));
      queryImages.push(await utils.loadImage('../tests/video2/out01.png'));
      queryImages.push(await utils.loadImage('../tests/video2/out02.png'));
      const queryImage0 = queryImages[0];

      const inputWidth = queryImage0.width;
      const inputHeight = queryImage0.height;
      controller = new MINDAR.Controller({inputWidth, inputHeight, debugMode: false});
      const {dimensions, matchingDataList, trackingDataList, imageListList} = await controller.addImageTargets('../examples/assets/card-example/card.mind');
      controller.dummyRun(queryImage0);
      setReady(true);
    }
    init();
  }, []);

  const start = useCallback(async () => {
    const targetIndex = 0;
    console.log("start", numRun);

    let timeSpent = {
      detect: [],
      match: [],
      track: [],
      trackUpdate: [],
    };
    let _start = null;

    for (let i = 0; i < numRun; i++) {
      _start = new Date();
      const {featurePoints} = await controller.detect(queryImages[0]);
      timeSpent['detect'].push(new Date() - _start);

      _start = new Date();
      const {modelViewTransform: firstModelViewTransform, allMatchResults, debugExtra} = await controller.match(featurePoints, targetIndex);

      /*
      const sumTime = {};
      for (let j = 0; j < debugExtras[0].length; j++) {
	Object.keys(debugExtras[0][j].time).forEach((k) => {
	  if (!sumTime[k]) sumTime[k] = 0;
	  sumTime[k] += debugExtras[0][j].time[k];
	});
      }
      const timeDiv = document.createElement("div");
      timeDiv.innerHTML = JSON.stringify(sumTime);
      document.body.appendChild(timeDiv);
      */

      timeSpent['match'].push(new Date() - _start);

      if (!firstModelViewTransform) {
	timeSpent['track'].push(0);
	timeSpent['trackUpdate'].push(0);
	continue;
      }

      _start = new Date();
      const nKeyframes = 1;
      const trackResult = await controller.track(queryImages[1], firstModelViewTransform, targetIndex);
      timeSpent['track'].push(new Date() - _start);
      //console.log("trackResultsf", trackResult);

      _start = new Date();
      const bestSelectedFeatures = trackResult;
      const newModelViewTransform = await controller.trackUpdate(firstModelViewTransform, bestSelectedFeatures);
      timeSpent['trackUpdate'].push(new Date() - _start);

      controller.showTFStats();
    }

    const avg = {};
    Object.keys(timeSpent).forEach((key) => {
      const sum = timeSpent[key].reduce((acc, t) => acc + t, 0.0);
      avg[key] = sum / timeSpent[key].length;
    });

    setResult({timeSpent, avg});
  });

  console.log("result", result);

  return (
    <div>
      <h1>Speed Test</h1>
      {!ready && <span>Initializing...</span>}
      {ready && (
	<div>
	  <input type="text" value={numRun} onChange={(e) => setNumRun(e.target.value)}/>
	  <button onClick={() => start()}>Run</button>
	</div>
      )}

      {result && (
	<div>
	  <table border="1">
	    <thead>
	      <tr>
		<th></th>
		{result.timeSpent['detect'].map((spent, index) => (
		  <th key={index}>{index+1}</th>
		))}
		<th>avg</th>
	      </tr>
	    </thead>
	    <tbody>
	      {Object.keys(result.timeSpent).map((key, keyIndex) => (
		<tr key={key}>
		  <td>{key}</td>
		  {result.timeSpent[key].map((t, index) => (
		    <td key={index}>{t}</td>
		  ))}
		  <td>{result.avg[key]}</td>
		</tr>
	      ))}
	    </tbody>
	  </table>
	</div>
      )}
    </div>
  )
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
