const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const conversationId = '_page_change_alert';


// const actual_png_filepath='redmi-node-9-pro-screencapture.png'
const drill_png_filepath_a='expected-screencapture/helloworld-1.png'
const drill_png_filepath_b='expected-screencapture/redmi-node-9-pro-screencapture.png'

function compare_png(png_path_a, png_path_b){

  const img1 = PNG.sync.read(fs.readFileSync(png_path_a));
  const img2 = PNG.sync.read(fs.readFileSync(png_path_b));
  const {width, height} = img1;
  const diff = new PNG({width, height});

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    {threshold: 0.1}
  );

  fs.writeFileSync('diff.png', PNG.sync.write(diff));

  return numDiffPixels
}

if (process.argv){
  if (process.argv[2]=='--drill'){
    console.log('drill init')
    const drill_message = process.argv[3]
    const compare_result = compare_png(drill_png_filepath_a, drill_png_filepath_b)

    if (compare_result > 10){

      (async (message) => {
        // See: https://api.slack.com/methods/chat.postMessage
        const res = await web.chat.postMessage({ channel: conversationId, text: message });

        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
      })(drill_message);

    }else{
      console.log('ignore me, this is the screen capture are the same.')
    }

  }else{
    const expected_png_filepath = process.argv[2]
    const actual_png_filepath = process.argv[3]
    const alert_message = process.argv[4]


    const compare_result = compare_png(expected_png_filepath, actual_png_filepath)

    if (compare_result > 10){

      (async (message) => {
        // See: https://api.slack.com/methods/chat.postMessage
        const res = await web.chat.postMessage({ channel: conversationId, text: message });

        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
      })(alert_message);

    }else{
      console.log('the screen capture are the same.')
    }
  }

}else{
  console.log('node src/lib/comparePng.js <expected_png> <actual_png>')
  console.log('node src/lib/comparePng.js --drill')
}
