import {
    FETCH_TRIPS_SUCCESS,
    fetchTripsSuccess,
    FETCH_TRIPS_ERROR,
    fetchTripsError,
    FETCH_TRIP_DETAILS_SUCCESS,
    fetchTripDetailsSuccess,
    FETCH_TRIP_DETAILS_ERROR,
    fetchTripDetailsError,
    DEFAULT_LOCATION,
    defaultLocation,
    SEARCH_LOCATION,
    searchLocation,
    MARKER_LOCATION,
    markerLocation,
    OPEN_MARKER,
    openMarker,
    CLOSE_MARKER,
    closeMarker, 
    REMOVE_PLACE_ERROR,
    removePlaceError,
    REMOVE_TRIP_ERROR,
    removeTripError
} from '../actions/protected-data';

describe('Location Tests', () => {
  it('Should set default location', () => {
    const location = { lat: 0, lng: 0 };
    const action = defaultLocation(location)
    expect(action.type).toEqual(DEFAULT_LOCATION)
    expect(action.location).toEqual(location)
  })

  it('Should set search location', () => {
      const location = { lat: 0, lng: 0 };
      const action = searchLocation(location)
      expect(action.type).toEqual(SEARCH_LOCATION)
      expect(action.location).toEqual(location)
  })

  it('Should set marker location', () => {
      const location = { lat: 0, lng: 0 };
      const action = markerLocation(location)
      expect(action.type).toEqual(MARKER_LOCATION)
      expect(action.location).toEqual(location)
  })
});

describe('Marker info-window actions', () => {
  it('Should open marker info-window', () => {
      const action = openMarker()
      expect(action.type).toEqual(OPEN_MARKER) 
  })

  it('Should open marker info-window', () => {
    const action = closeMarker()
    expect(action.type).toEqual(CLOSE_MARKER) 
})
});

describe('Fetch trip actions', () => {
  it('Should fetch trip results', () => {
      const trip = {
        "location": {
            "lat": "51.5073509",
            "lng": "-0.1277583"
        },
        "photos": [],
        "comment": [
            "London in Spring 2019 baby!",
            "Don't forget to get a phone"
        ],
        "name": "London",
        "place_id": "ChIJdd4h4239084098509345",
        "address": "London, UK",
        "userId": "5b2428b87c8ef10014218d32",
        "id": "5b2d3b243a2b1802a004b320"
      };
      const action = fetchTripsSuccess(trip);
      expect(action.type).toEqual(FETCH_TRIPS_SUCCESS)
      expect(action.results).toEqual(trip)
  })

  it('Should throw error on fetch trips error', () => {
      const error = 'this is an error';
      const action = fetchTripsError(error);
      expect(action.type).toEqual(FETCH_TRIPS_ERROR)
      expect(action.error).toEqual(error)
  })

  it('Should fetch trip details', () => {
      const tripDetail = {
        "html_attributions" : [],
        "result" : {
           "address_components" : [
              {
                 "long_name" : "5",
                 "short_name" : "5",
                 "types" : [ "floor" ]
              },
              {
                 "long_name" : "48",
                 "short_name" : "48",
                 "types" : [ "street_number" ]
              }
           ],
           "adr_address" : "5, \u003cspan class=\"street-address\"\u003e48 Pirrama Rd\u003c/span\u003e, \u003cspan class=\"locality\"\u003ePyrmont\u003c/span\u003e \u003cspan class=\"region\"\u003eNSW\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e2009\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eAustralia\u003c/span\u003e",
           "formatted_address" : "5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia",
           "formatted_phone_number" : "(02) 9374 4000",
           "geometry" : {
              "location" : {
                 "lat" : -33.866651,
                 "lng" : 151.195827
              },
              "viewport" : {
                 "northeast" : {
                    "lat" : -33.8653881697085,
                    "lng" : 151.1969739802915
                 },
                 "southwest" : {
                    "lat" : -33.86808613029149,
                    "lng" : 151.1942760197085
                 }
              }
           },
           "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
           "id" : "4f89212bf76dde31f092cfc14d7506555d85b5c7",
           "international_phone_number" : "+61 2 9374 4000",
           "name" : "Google",
           "place_id" : "ChIJN1t_tDeuEmsRUsoyG83frY4",
           "rating" : 4.5,
           "reference" : "CmRSAAAAjiEr2_A4yI-DyqGcfsceTv-IBJXHB5-W3ckmGk9QAYk4USgeV8ihBcGBEK5Z1w4ajRZNVAfSbROiKbbuniq0c9rIq_xqkrf_3HpZzX-pFJuJY3cBtG68LSAHzWXB8UzwEhAx04rgN0_WieYLfVp4K0duGhTU58LFaqwcaex73Kcyy0ghYOQTkg",
           "reviews" : [
              {
                 "author_name" : "Robert Ardill",
                 "author_url" : "https://www.google.com/maps/contrib/106422854611155436041/reviews",
                 "language" : "en",
                 "profile_photo_url" : "https://lh3.googleusercontent.com/-T47KxWuAoJU/AAAAAAAAAAI/AAAAAAAAAZo/BDmyI12BZAs/s128-c0x00000000-cc-rp-mo-ba1/photo.jpg",
                 "rating" : 5,
                 "relative_time_description" : "a month ago",
                 "text" : "Awesome offices. Great facilities, location and views. Staff are great hosts",
                 "time" : 1491144016
              }
           ],
           "scope" : "GOOGLE",
           "types" : [ "point_of_interest", "establishment" ],
           "url" : "https://maps.google.com/?cid=10281119596374313554",
           "utc_offset" : 600,
           "vicinity" : "5, 48 Pirrama Road, Pyrmont",
           "website" : "https://www.google.com.au/about/careers/locations/sydney/"
        },
        "status" : "OK"
      };
      const action = fetchTripDetailsSuccess(tripDetail);
      expect(action.type).toEqual(FETCH_TRIP_DETAILS_SUCCESS)
      expect(action.results).toEqual(tripDetail)
  })

  it('Should throw error on fetch trip details error', () => {
    const error = 'this is an error';
    const action = fetchTripDetailsError(error);
    expect(action.type).toEqual(FETCH_TRIP_DETAILS_ERROR)
    expect(action.error).toEqual(error)
  })
});

describe('Place and trip actions', () => {
    it('Should throw error on remove place error', () => {
        const error = 'this is an error';
        const action = removePlaceError(error);
        expect(action.type).toEqual(REMOVE_PLACE_ERROR)
        expect(action.error).toEqual(error)
    })

    it('Should throw error on remove trip error', () => {
        const error = 'this is an error';
        const action = removeTripError(error);
        expect(action.type).toEqual(REMOVE_TRIP_ERROR)
        expect(action.error).toEqual(error)
    })
});