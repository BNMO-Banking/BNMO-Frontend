const startYear = 2020;

const generateYearList = (startYear: number) => {
    const years = [];
    for (let i = startYear; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }

    return years;
};

export const years = {
    selected: new Date().getFullYear(),
    lists: generateYearList(startYear)
};
