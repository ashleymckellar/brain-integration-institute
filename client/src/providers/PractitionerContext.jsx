/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
// import axios from "axios"
import { PractitionerContext } from "../contexts";
import { UserContext } from "../contexts";
import { useAuth0 } from '@auth0/auth0-react';


export const PractitionerProvider = ({children}) => {

const [practitioners, setPractitioners] = useState([])
const { getAccessTokenSilently, user } = useAuth0();

const { allProfiles, setAllProfiles, setError } = useContext(UserContext)

const fetchAllProfiles = async () => {
  try {
     
      const response = await fetch(`/api/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAllProfiles(data)
      console.log('profiles set!')
  } catch (error) {
      console.error('Error fetching profile data:', error);
      setError(error.message);
  }
};




// useEffect(() => {
//   fetchAllProfiles()
// }, [])

// if(allProfiles) {
//   console.log(allProfiles)
// }


useEffect(() => {
setPractitioners([
    {
        name : {firstName: "Simone",
        lastName: "Biles"},
        title: "Olympic Champion Gymnastics",
        location: "USA",
        imgURL: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-08/240802-simone-biles-ch-1231-ec67dc.jpg",
        phone: "(123) 456-7890",
        email: "athlete@olympics.com",
        website: "https://olympics.com/en/paris-2024"
      },
      {
        name : {firstName: "Stephen",
        lastName: "Nedoroscik"},
        title: "Pommel Horse Bronze Medalist",
        location: "USA",
        imgURL: "https://images2.minutemediacdn.com/image/upload/c_crop,w_1200,h_675,x_0,y_28/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/si/01j3zytd7r4zetej2wrz.jpg", // Replace with actual image URL
        phone: "(123) 456-7890",
        email: "athlete@olympics.com",
        website: "https://olympics.com/en/paris-2024"
      },
      {
          name : {firstName: "Ilona",
          lastName: "Maher"},
          title: "Olympic Rugby Player",
          location: "USA",
          imgURL: "https://on3static.com/uploads/dev/assets/cms/2024/08/05093636/Ilona-Maher.jpg", // Replace with actual image URL
          phone: "(123) 456-7890" ,
          email: "athlete@olympics.com",
          website: "https://olympics.com/en/paris-2024"
        },
        {
            name : {firstName: "Katie",
            lastName: "Ledecky"},
            title: "Olympic Champion Swimming",
            location: "USA",
            imgURL: "https://people.com/thmb/wIDI4iL0NGjSwfRh_4Y-M7-UZ0c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(798x143:800x145)/Katie-Ledecky-022924-a103a19ccc8e4302bfe764fd25e59fb5.jpg",
            phone: "(123) 456-7890",
            email: "athlete@olympics.com",
            website: "https://olympics.com/en/paris-2024"
        },
        {
            name : {firstName: "Summer",
            lastName: "McIntosh"},
            title: "Olympic Champion Swimming",
            location: "Canada",
            imgURL: "https://www.theglobeandmail.com/resizer/v2/FJU6R5ABS5DIFGJ6KAUOOM23PU.jpg?auth=b02da4e4e53d18c5d4d5428bdbec40b50d638e888f71dc6b622719f1c1c1853d&width=600&quality=80", // Replace with actual image URL
            phone: "(123) 456-7890",
            email: "athlete@olympics.com",
            website: "https://olympics.com/en/paris-2024"
        },
        {
          name : {firstName: "Yusuf",
          lastName: "Dikec"},
          title: "Olympic Silver Medalist, shooting",
          location: "Turkey",
          imgURL: "https://vcdn1-english.vnecdn.net/2024/08/02/coolturk-1722561446-1722561485-5608-1722561550.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=R2tCIvlk-tbKu0DpJLWcCw", // Replace with actual image URL
          phone: "(123) 456-7890",
          email: "athlete@olympics.com",
          website: "https://olympics.com/en/paris-2024"
        },
        {
           name: {firstName: "Rafael",
            lastName: "Nadal"},
            title: "Olympic Tennis Player",
            location: "Spain",
            imgURL: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/v1722175599/primary/sewmw7sapjfkp00uvcht",
            phone: "(123) 456-7890" ,
            email: "athlete@olympics.com",
            website: "https://olympics.com/en/paris-2024"
          },
          {
            name : {firstName: "Léon",
            lastName: "Marchand"},
            title: "POlympic Champion Swimmer",
            location: "France",
            imgURL: "data:image/jpeg;base64,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", // Replace with actual image URL
            phone: "(123) 456-7890",
            email: "athlete@olympics.com",
           
          }
])
}, []);
return(
    <PractitionerContext.Provider
    value = {{
practitioners
    }}
    >
        {children}
    </PractitionerContext.Provider>
)

}