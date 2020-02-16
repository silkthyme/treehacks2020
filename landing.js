var insideTexts = [
  'Seasonal snow is an important part of Earth\'s climate system.',
  'As the world warms, mountain snowpack will not only melt earlier, it will also melt more slowly, according to a new study by scientists at the National Center for Atmospheric Research (NCAR).',
  'A reduction in high melt rates could mean fewer spring floods, which could lower the risk of infrastructure damage but also negatively affect riparian ecosystems.',
  'Changes in the timing and amount of snowmelt runoff could also cause warmer stream temperatures, which would affect trout and other fish species, and the expected decrease in streamflow could cause shortages in urban water supplies.',
  'The earlier snowmelt could explain recent research that suggests the average streamflow in watersheds encompassing snowy mountains may decline as the climate warms - even if the total amount of precipitation in the watershed remains unchanged.',
  'When snowpack melts more slowly, the resulting water lingers in the soil, giving plants more opportunity to take up the moisture. Water absorbed by plants is water that doesn\'t make it into the stream, potentially reducing flows.',
];
var intervalLength = 10000;

var index = 1;
var insideTextsElement = document.getElementById('insidetext');

function replaceText() {
  insideTextsElement.textContent = insideTexts[index];
  index = (index + 1) % insideTexts.length;
}

window.setInterval(replaceText, intervalLength);
