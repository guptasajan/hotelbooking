// import React, { useEffect, useState } from 'react'
// import { HotelCard } from './HotelCard'
// import { Title } from './Title'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../conext/AppContext'





// export const RecommendedHotels = () => {
//     const { rooms, searchedCities } = useAppContext();
//     const [recommended, setRecommended] = useState([]);

//     const filterHotels = () => {
//         const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
//         setRecommended(filterHotels);
//     }

//     useEffect(() => {
//         filterHotels()
//     }, [rooms, searchedCities])


//     return recommended.length > 0 && (
//         <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

//             <Title title='recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgetable experiences.' />

//             <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
//                 {recommended.slice(0, 4).map((room, index) => (
//                     <HotelCard key={room._id} room={room} index={index} />
//                 ))}
//             </div>


//         </div>




//     )
// }

// export default RecommendedHotels






import React, { useEffect, useState } from 'react';
import { HotelCard } from './HotelCard';
import { Title } from './Title';
import { useAppContext } from '../conext/AppContext';

const RecommendedHotels = () => {
    const { rooms = [], searchedCities = [] } = useAppContext();

    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        if (!Array.isArray(rooms) || !Array.isArray(searchedCities)) {
            setRecommended([]);
            return;
        }

        const filteredHotels = rooms.filter(
            (room) =>
                room?.hotel?.city &&
                searchedCities.includes(room.hotel.city)
        );

        setRecommended(filteredHotels);
    }, [rooms, searchedCities]);

    if (!recommended || recommended.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
            <Title
                title="Recommended Hotels"
                subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
            />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard
                        key={room._id || index}
                        room={room}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedHotels;