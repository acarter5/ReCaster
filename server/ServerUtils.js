const getShoutOutIdx = function(shoutOuts, time, offset=0) {
  var mid = Math.floor(shoutOuts.length/2);


  if (!shoutOuts.length) {
    return offset;
  } else if (shoutOuts[mid].timespot === time) {
    return -1;
  } else if (time < shoutOuts[mid].timespot) {
    return getShoutOutIdx(shoutOuts.slice(0, mid), time, offset);
  } else if (time > shoutOuts[mid].timespot) {
    return getShoutOutIdx(shoutOuts.slice(mid + 1), time, offset + mid + 1);
  }
}

const formatText = function(text) {
  var lines = 0;
  var chars = 0;
  var maxLines = 6;
  var maxChars = 95;
  var textArr = text.split(' ');
  var curWord;
  var finalArr = [];
  var subArr = [];
  var tupple;
  var newLine = false;
  var lastSnippet;

  while (lines < maxLines && textArr.length) {
    curWord = textArr.shift();

    if (curWord.search(/\n/) !== -1) {
      tupple = curWord.split('\n');
      curWord = tupple[0];
      textArr.unshift(tupple[1]);
      newLine = true;
    }

    chars += curWord.length + 1;

    if (chars >= maxChars) {
      debugger;
      chars = chars - maxChars;
      lines++;
      if (lines >= maxLines) {
        break;
      }
    }

    subArr.push(curWord);

    if (newLine) {
      finalArr.push(subArr);
      lines++;
      subArr = [];
    }

    newLine = false;

    if (lines === 2) {
      maxChars = 109;
    }
  }

  if (subArr.length && finalArr.length) {
    finalArr[finalArr.length - 1] = finalArr[finalArr.length - 1].concat(subArr);
  } else if (subArr.length && !finalArr.length) {
    finalArr.push(subArr);
  }

  finalArr = finalArr.map((arr) => {
    return arr.join(' ');
  });

  lastSnippet = finalArr[finalArr.length -1];

  finalArr[finalArr.length -1] = lastSnippet.substring(0, lastSnippet.lastIndexOf('.') + 1);
  return finalArr.join('\n');
}

module.exports = { getShoutOutIdx, formatText };