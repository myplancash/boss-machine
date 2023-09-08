export const formatCash = num => {
  let numberWithCommas = num.toString()
      .split('')
      .reverse()
      .reduce((accum, curr, idx) => {
        if (idx > 2 && idx % 3 === 0) {
          return curr + ',' + accum;
        }
        return curr + accum;
      }, '');
  return `$${numberWithCommas}`;
};

export const isMillionDollarIdea = (weeklyRevenue, numWeeks) => {
  const totalMoney = Number(numWeeks) * Number(weeklyRevenue);
  if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
    return false;
  } else {
    return true;
  }
}

export const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

export const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};


module.exports = {
  formatCash,
  isMillionDollarIdea,
  getIndexById,
  updateElement,
};