const getClosestNextRun = runs => {
  // console.log(runs.length);
  if (runs.length === 1) return runs[0];
  // Desc order of date
  runs.sort((a, b) => {
    var dateA = new Date(a.start),
      dateB = new Date(b.start);
    return dateB - dateA;
  });

  let latestStartDate = new Date(runs[0].start);
  let latestRun = runs[0];
  console.log(runs.map(r => r.start));
  let run;
  for (let i = 0; i < runs.length; i++) {
    run = runs[i];
    var today = new Date();
    var runDate = new Date(run.start);
    if (runDate < latestStartDate && runDate > today) {
      latestStartDate = runDate;
      latestRun = run;
    }
    if (runDate < today && today < latestStartDate) return latestRun;
    if (runDate === latestStartDate && runDate < today) return run;
    if (i === runs.length - 1 && today < runDate) return run;
  }
  console.log(latestRun.start, run.startDate);
  return latestRun;
};

export default getClosestNextRun;
