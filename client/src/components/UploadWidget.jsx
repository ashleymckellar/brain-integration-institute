// /* eslint-disable react/prop-types */
// import { createContext, useContext, useEffect, useState } from 'react';
// import { Cloudinary } from "@cloudinary/url-gen";
// import { useAuth0 } from "@auth0/auth0-react"; 
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
// import { CloudinaryContext } from '../contexts';


// const UploadWidgetContext = createContext();

// function UploadWidget() {
//     const [publicId, setPublicId] = useState("");
 
//     // const [cloudName] = useState("dpbf9gwjq");
   
//     // const [uploadPreset] = useState("react-course-demo");
//     const [loaded, setLoaded] = useState(false);

//     // const [uwConfig] = useState({
//     //     cloudName,
//     //     uploadPreset
//     // })

//     const { uwConfig, cloudName, uploadPreset } = useContext(CloudinaryContext);

//     const cld = new Cloudinary({
//         cloud: {
//           cloudName
//         }
//       });
    
//       const myImage = cld.image(publicId);
//       const { getAccessTokenSilently } = useAuth0(); 
       

//     useEffect(() => {
//         if (!loaded) {
//             const uwScript = document.getElementById('uw');
//             if (!uwScript) {
//                 const script = document.createElement('script');
//                 script.setAttribute('async', '');
//                 script.setAttribute('id', 'uw');
//                 script.src = 'https://upload-widget.cloudinary.com/global/all.js';
//                 script.addEventListener('load', () => setLoaded(true));
//                 document.body.appendChild(script);
//             } else {
//                 setLoaded(true);
//             }
//         }
//     }, [loaded]);

//     console.log(uwConfig)

//     const initializeCloudinaryWidget = () => {
//         if (loaded) {
//             console.log('widget loaded!')
//             const myWidget = window.cloudinary.createUploadWidget(
//                 uwConfig,
//                 async (error, result) => {
//                     if (error) {
//                         console.error('Upload error:', error);
//                         return;
//                     }
//                     if (result.event === "success")  {
//                         console.log('success', result)
//                         const fileMetadata = {
//                             publicId: result.info.public_id,
//                             url: result.info.secure_url,
//                             uploadDate: result.info.created_at,
//                             filename: result.info.original_filename,
//                             isApproved: false,
//                         };
//                         console.log(result.info.public_id)
//                         setPublicId(result.info.public_id);
//                         console.log(fileMetadata)
                        

//                         try {
//                             const accessToken = await getAccessTokenSilently();
                        
//                             const response = await fetch('http://localhost:8080/api/files', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                     'Authorization': `Bearer ${accessToken}`,
                                    
//                                 },
//                                 body: JSON.stringify(fileMetadata),
                              
//                             });
//                             const responseText = await response.text();
//                             console.log('Response Text:', responseText); 
//                             console.log('API Call - URL:', '/api/files');
// console.log('API Call - Body:', fileMetadata);
//                             if (response.ok) {
//                                 console.log('File metadata successfully sent to the server.', fileMetadata);
//                             } else {
//                                 console.error('Failed to send file metadata to the server.');
//                             }
//                         } catch (error) {
//                             console.error('Error sending file metadata:', error);
//                         }
//                     }
//                 }
//             );

//             document.getElementById('upload_widget').addEventListener(
//                 'click',
//                 function () {
//                     myWidget.open();
//                     console.log("widget button clicked")
//                 },
//                 false
//             );
//         }
//     };

//     return (
//         <UploadWidgetContext.Provider value={{ loaded }}>
//             <button
//                 id="upload_widget"
//                 className="cloudinary-button"
//                 onClick={initializeCloudinaryWidget}
//             >
//                 Upload
//             </button>
//         </UploadWidgetContext.Provider>
//     );
// }

// export default UploadWidget;
// export { UploadWidgetContext };
