Handlebars.registerHelper('multiply', function (a, b) { return a * b; });
Handlebars.registerHelper('divide', function (a, b) { return a / b; });
Handlebars.registerHelper('add', function (a, b) {
  if (a === undefined || a === null ) {
    a = 0;
  }
  if (b === undefined || b === null ) {
    b = 0;
  }
  return a + b;
});
Handlebars.registerHelper('subtract', function (a, b) { return a - b; });
Handlebars.registerHelper('join', function (a, b, separator) {
    return `${a}${separator}${b}`;
});
Handlebars.registerHelper('tamupath', function TAMUPath(sampleId, wagon = false) {
    if (sampleId === undefined || sampleId === null || sampleId === '' || (Array.isArray(sampleId) && sampleId.length === 1 && sampleId[0] === '')) {
        return '';
    }
    let campaign = sampleId.substr(0, 3);
    let sampleNo = parseInt(sampleId.substr(3, 2));
    let wagonId = Math.trunc(sampleNo / 8);
    let wagonBegin = (wagonId * 8 + 1).toString().padStart(2, '0');
    let wagonEnd = ((wagonId + 1) * 8).toString().padStart(2, '0');
    let group = sampleId.split('_')[1];
    let manufactureMethod = group.substr(0, 3);
    let method = sampleId.split('_')[2];
    if (method === 'EDS') {
        method = manufactureMethod === 'VAM' ? 'SEM-EDS' : 'EDS-EBSD';
    } else if (method === 'SHPB') {
        method = `Compression (SHPB)/${sampleId.split('_')[3]}`;
    } else if (method === 'Tensile' || method === 'SPT') {
        method = `${method}/${sampleId.split('_')[3]}`;
    }
    if (manufactureMethod === 'VAM') {
        return `${campaign}/${group}/${sampleId.split('_')[0]}/${method}`;
    } else if (manufactureMethod === 'DED') {
        let root = `${campaign}/${group}-${wagonBegin}-${wagonEnd}`;
        if (wagon) {
            return `${root}/${method}`;
        } else {
            return `${root}/${sampleId.split('_')[0]}/${method}`;
        }
    }
});
