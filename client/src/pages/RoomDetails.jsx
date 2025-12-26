import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {

    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(()=> {
        const room = roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[])

  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* Room Details */}
        <div>
            <h1>{room.hotel.name} <span>({room.roomType})</span></h1>
            <p>20% OFF</p>
        </div>

        {/* Room Rating */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt="Room-Image" 
                className='w-full rounded-xl shadow-lg object-cover'/>
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {room?.images.length > 1 && room.images.map((image, index)=>(
                    <img onClick={()=> setMainImage(image)}
                    key={index} src={image} alt="Room Image" 
                    className={`w-full rounded-xl shadow-md object-cover
                        cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                            
                ))}

            </div>
        </div>

        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {room.amenities.map((item, index)=>(
                        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Room Price */}
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>

        </div>

        {/* CheckIn CheckOut Form */}
        <form className='flex flex-col md:flex-row items-start md:items-center
        justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
        mx-auto mt-16 max-w-6xl'>

            <div className='flex flex-col flex-wrap md:flex-row items-start
            md:items-center gap-4 md:gap-10 text-gray-500'>

                <div className='flex flex-col'>
                    <label htmlFor="checkInData" className='font-medium'>Check-In</label>
                    <input type="date" id="checkInData" placeholder='Check-In'
                    className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5
                    outline-none' required/>
                </div>
                
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>


                <div className='flex flex-col'>
                    <label htmlFor="checkOutData" className='font-medium'>Check-Out</label>
                    <input type="date" id="checkOutData" placeholder='Check-Out'
                    className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5
                    outline-none' required/>
                </div>

                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                
                <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-medium'>Guests</label>
                    <input type="number" id="guests" placeholder='0'
                    className='max-w-20 rounded border border-gray-300 px-3 py-2 
                    mt-1.5 outline-none' required/>
                </div>

            </div>

            

            <button type='submit' className='bg-primary hover:bg-primary-dull
            active:scale-95 transition-all text-white rounded-md max-md:w-full
            max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                Check Availability
            </button>

        </form>

        {/* Common Specifications */}
        <div className='mt-20 space-y-4'>
            {roomCommonData.map((spec, index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
            <p>Guests will be allocated on the ground floor according to availability.
                You get a comfortable Two bedroom apartment has a true city feeling. 
                The price quoted is for two guest, at the guest slot please mark the number of 
                guests to get the exact price for groups. The Guests will be allocated ground floor
                according to availability. You get the comfortable two bedroom
                apartment that has a true city feeling. 
            </p>
        </div>

        {/* Hosted by */}
        <div className='flex flex-col items-start gap-4'> 
            <div className='flex gap-4'>
                <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14
                md:h-18 md:w-18 rounded-full'/>
                <div>
                    <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                    <div className='flex items-center mt-1'>
                        <StarRating/>
                        <p className='ml-2'>200+ reviews</p>
                    </div>
                </div>
            </div>
            <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary
            hover:bg-primary-dull transition-all cursor-pointer'>
                Contact Now
            </button>
        </div>
    </div>
  )
}

export default RoomDetails




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, roomsDummyData } from '../assets/assets';
// import StarRating from '../components/StarRating';

// const RoomDetails = () => {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [mainImage, setMainImage] = useState(null);

//   useEffect(() => {
//     const foundRoom = roomsDummyData.find((item) => item._id === id);
//     if (foundRoom) {
//       setRoom(foundRoom);
//       setMainImage(foundRoom.images[0]);
//     }
//   }, [id]); // Added id to dependencies

//   // Handle case where room isn't found
//   if (!room) {
//     return <div className="py-40 text-center text-gray-500">Loading room details...</div>;
//   }

//   return (
//     <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto'>
      
//       {/* Header Section */}
//       <div className='mb-6'>
//         <div className='flex flex-wrap items-baseline gap-2'>
//           <h1 className='text-3xl font-bold text-gray-800'>{room.hotel.name}</h1>
//           <span className='text-xl text-gray-500'>({room.roomType})</span>
//         </div>
        
//         <div className='flex items-center gap-4 mt-3'>
//           <div className='flex items-center gap-1'>
//             <StarRating />
//             <p className='ml-2 text-sm font-medium'>200+ reviews</p>
//           </div>
//           <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold'>
//             20% OFF
//           </span>
//         </div>

//         <div className='flex items-center gap-1 text-gray-500 mt-3'>
//           <img src={assets.locationIcon} className='w-4 h-4' alt="location" />
//           <span className='text-sm'>{room.hotel.address}</span>
//         </div>
//       </div>

//       {/* Image Gallery */}
//       <div className='flex flex-col lg:flex-row gap-6'>
//         {/* Main Display */}
//         <div className='lg:w-2/3 w-full'>
//           <img 
//             src={mainImage} 
//             alt="Main Room View" 
//             className='w-full h-[400px] md:h-[500px] rounded-2xl shadow-lg object-cover transition-all duration-300'
//           />
//         </div>

//         {/* Thumbnail Grid */}
//         <div className='grid grid-cols-4 lg:grid-cols-2 gap-3 lg:w-1/3 w-full'>
//           {room.images.map((image, index) => (
//             <div 
//               key={index}
//               onClick={() => setMainImage(image)}
//               className={`relative cursor-pointer overflow-hidden rounded-xl h-24 md:h-32 lg:h-full 
//                 ${mainImage === image ? 'ring-4 ring-orange-500' : 'hover:opacity-80'}`}
//             >
//               <img 
//                 src={image} 
//                 alt={`Room thumbnail ${index + 1}`} 
//                 className='w-full h-full object-cover'
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;