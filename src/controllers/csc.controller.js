import { Country, State, City }  from 'country-state-city';

export const getCountries = async (req, res) => {
    
    const countries = Country.getAllCountries();

    res.json({
        status: 'success',
        data: countries
    });
}

export const getStatesOfCountry = async (req, res) => {

    const { isoCode } = req.body

    const states = State.getStatesOfCountry(isoCode);

    res.json({
        status: 'success',
        data: states
    });
}

/* export const getCitiesOfCountry = async (req, res) => {

    const { countryCode, stateCode } = req.body
    
    const cities = City.getCitiesOfState(countryCode, stateCode);

    console.log(cities)


} */
