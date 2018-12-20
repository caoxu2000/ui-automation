beforeSession: (config, capabilities, specs) => {
    const feature = fs.readFileSync(specs[0], { encoding: 'utf-8' });
    const featureName = feature.match(/feature: (.*)/i)[1];
    capabilities.name = featureName;
  }