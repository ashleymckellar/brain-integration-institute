// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import CldImage from './CldImage';
// import { useAuth0 } from '@auth0/auth0-react';


// const Certdocs = ({ folder }) => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { isAuthenticated, user } = useAuth0();

//     console.log(images)

  
//         const fetchImages = async () => {
//             try {
//                 const response = await fetch(`/api/images/${folder}`);
//                 const data = await response.json();
//                 setImages(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//                 setLoading(false);
//             }
//         };
//         if (user) {
//             fetchImages();
//         }
    
  


//     if (loading) {
//         return <p>Loading images...</p>;
//     }

//     // if (images.length === 0) {
//     //     return <p>No images found in this folder.</p>;
//     // }

//     return (
//         <div className="grid grid-cols-3 gap-4">
//             {images.map((image) => (
//                 <CldImage key={image.public_id} publicId={image.public_id} />
//             ))}
//         </div>
//     );
// };

// export default Certdocs;
