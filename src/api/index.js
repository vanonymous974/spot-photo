import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
    try {
        const { data: { data } } = await axios.get(URL, {
          params: {
            tr_longitude: '-0.4047609950083575',
            tr_latitude: '44.91989115868269',
            bl_longitude: '-0.7781568164062413',
            bl_latitude: '44.77084384690857',
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': 'edc100d19dmsh925e0e853edae3bp1fd2d2jsnb38a72dd2818'
          }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}