export const formatCoordinates = (lng, lat) => {
    return `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`;
};

export const validateCoordinates = (lng, lat) => {
    return (
        lng >= -180 && lng <= 180 &&
        lat >= -90 && lat <= 90
    );
};
