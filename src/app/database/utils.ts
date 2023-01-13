export function getDateRandom(
    isNewDate = true,
    day = 1,
    month = 1,
    year = new Date().getFullYear()
): Date {
    const dateIni = new Date(`${year}-${month}-${day}`);
    const dateEnd = new Date();

    if (dateIni > dateEnd) {
        dateIni.setFullYear(year - 1);
    }
    const diff = dateEnd.getTime() - dateIni.getTime();
    if (isNewDate) {
        return new Date(dateIni.getTime() + diff * Math.random());
    } else {
        return dateIni;
    }
}
