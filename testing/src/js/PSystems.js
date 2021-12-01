const PSystems = {
  list: [
    {
      code: 'mir', min: 16, max: 16, membership: '^2',
    },
    {
      code: 'din', min: 12, max: 12, membership: '^3[068]',
    },
    {
      code: 'jcb', min: 13, max: 14, membership: '^3[15]',
    },
    {
      code: 'ame', min: 15, max: 15, membership: '^3[37]',
    },
    {
      code: 'vis', min: 13, max: 16, membership: '^4',
    },
    {
      code: 'mae', min: 12, max: 19, membership: '^(5[0678]|6[37])',
    },
    {
      code: 'mas', min: 16, max: 16, membership: '^5[1-5]',
    },
    {
      code: 'dis', min: 16, max: 16, membership: '^60',
    },
    {
      code: 'unp', min: 16, max: 16, membership: '^62',
    },
  ],
  identity(number) {
    const pSystemsList = this.list;
    for (let i = 0; i < pSystemsList.length; i += 1) {
      if ((new RegExp(pSystemsList[i].membership).test(number))) {
        return pSystemsList[i];
      }
    }
    return false;
  },
};

export default PSystems;
