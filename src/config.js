export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

export const IMAGE_KEY = process.env.IMAGE_KEY

export const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY

console.log('key',GOOGLE_API_KEY);
console.log('entry key',process.env.GOOGLE_MAPS_API_KEY);