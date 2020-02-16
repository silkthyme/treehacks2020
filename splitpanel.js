// Demonstrates before/after imagery comparison with a variety of dates.


/*
 * Configure the imagery
 */

// Snow coverage in the Sierra Nevadas on February 16th of each year
var images = {
    '02-16-2019': getWeeklySentinelComposite('2019-02-16'),
    '02-16-2018': getWeeklySentinelComposite('2018-02-16'),
    '02-16-2017': getWeeklySentinelComposite('2017-02-16'),
    '02-16-2016': getWeeklySentinelComposite('2016-02-16'),
  };
  
  // Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
  // given date.
  function getWeeklySentinelComposite(date) {
    var date = ee.Date(date);
    var sentinel1 = ee.ImageCollection('MODIS/006/MOD10A1')
                        .filterDate(date, date.advance(1, 'week'))
                        .select('NDSI_Snow_Cover')
                        .median();
    return sentinel1.visualize({min: 0, max: 100, palette: ['skyblue', 'white']});
  }
  
  
  /*
   * Set up the maps and control widgets
   */
  
  // Create the left map, and have it display layer 0.
  var leftMap = ui.Map();
  leftMap.setControlVisibility(false);
  var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
  
  // Create the right map, and have it display layer 1.
  var rightMap = ui.Map();
  rightMap.setControlVisibility(false);
  var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
  
  // Adds a layer selection widget to the given map, to allow users to change
  // which image is displayed in the associated map.
  function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('Choose an image to visualize');
  
    // This function changes the given map to show the selected image.
    function updateMap(selection) {
      mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    }
  
    // Configure a selection dropdown to allow the user to choose between images,
    // and set the map to update when a user makes a selection.
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
    select.setValue(Object.keys(images)[defaultValue], true);
  
    var controlPanel =
        ui.Panel({widgets: [label, select], style: {position: position}});
  
    mapToChange.add(controlPanel);
  }
  
  
  /*
   * Tie everything together
   */
  
  // Create a SplitPanel to hold the adjacent, linked maps.
  var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([splitPanel]);
  var linker = ui.Map.Linker([leftMap, rightMap]);
  leftMap.setCenter(-119.517017, 38.504847, 6);
  