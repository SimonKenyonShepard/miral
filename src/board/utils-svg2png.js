const replaceAsync = async (str, regex, asyncFn) => {
  const promises = [];
  str.replace(regex, (match, ...args) => {
      const promise = asyncFn(match, ...args);
      promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

const getBase64FromUrl = async (match, group1, url, group2) => {
  const proxiedURL = encodeURIComponent(url);
  const data = await fetch(proxiedURL);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      const base64data = reader.result;   
      resolve(group1+base64data+group2);
    }
  });
}

function getSvgUrl(svg) {
  return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}

function svgUrlToPng(svgUrl, options, callback) {
  const svgImage = new Image(options.width, options.height);
  svgImage.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      const canvasCtx = canvas.getContext('2d');
      const newHeight = (this.width/this.naturalWidth) * this.naturalHeight;
      const verticalOffset = (this.height-newHeight)/2;
      canvasCtx.drawImage(svgImage, 0, verticalOffset, options.width, newHeight);
      const imgData = canvas.toDataURL('image/png');
      callback(imgData);
  };
  svgImage.src = svgUrl;
}

async function cleanSVG(svg) {
  let finalSVG = svg;
  finalSVG = finalSVG.replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, "");
  finalSVG = await replaceAsync(finalSVG, /(<image .*? href=")(.+?)(")/g, getBase64FromUrl);
  return finalSVG;
}

export async function svgToPng(svg, options, callback) {
  const url = getSvgUrl(await cleanSVG(svg));
  svgUrlToPng(url, options, (imgData) => {
      callback(imgData);
      URL.revokeObjectURL(url);
  });
}