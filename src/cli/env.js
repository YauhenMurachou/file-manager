const parseEnv = () => {
  const rssVars = Object.keys(process.env).filter(key => key.startsWith('RSS_'));
  const output = rssVars.map(key => `${key}=${process.env[key]}`).join('; ');
  console.log(output);
};

parseEnv();