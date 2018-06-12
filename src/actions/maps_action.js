


export const GET_MAP_REQUEST = 'GET_MAP_REQUEST'
export const getMapRequest = () => ({
    type:'GET_MAP_REQUEST',
})


export const GET_MAP_SUCESS = 'GET_MAP_SUCESS'
export const getMapSucess = (food) => ({
    type:'GET_MAP_SUCESS',
    food: food
})


export const GET_MAP_ERROR= 'GET_MAP_ERROR'
export const getMapError = (error) => dispatch => ({
    type:'GET_MAP_ERROR',
    error

})

export const getMap = () => dispatch =>{
  return fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBXA4tX8ySIno2q5xgbEWZGp-4ycFcal2Y&callback=initMap`)
}