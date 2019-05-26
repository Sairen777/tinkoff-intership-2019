async function parallelComputing(initialFunctions, mainFunction) {
  await Promise.all(initialFunctions.map(async func =>
    await new Promise(resolve => func(resolve))));
  mainFunction();
}

const first = callback => setTimeout(() => {
  console.log('first func done');
  callback();
}, 1000);

const second = callback => setTimeout(() => {
  console.log('second func done');
  callback();
}, 2000);

const third = callback => setTimeout(() => {
  console.log('third func done');
  callback();
}, 3000);

const mainFunction = () => console.log('main done');

parallelComputing([first, second, third], mainFunction);
