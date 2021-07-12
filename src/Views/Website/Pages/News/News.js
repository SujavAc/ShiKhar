import React from "react";
import "./News.scss";
import Navigationbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Figure } from 'react-bootstrap'
import { fireStore } from '../../../../Firebase/config';


export default function News(){

  const [news,setNews] = React.useState([]);

  React.useEffect(()=>{
    fireStore.collection('News').onSnapshot(onCollectionUpdate);
  });

  const onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Title, Description, Url } = doc.data();
      data.push({
        key: doc.id,
        doc,
        Title,
        Description,
        Url,
      });
    });
    setNews(data);
  };

  return(
    <div id="news">
         <Navigationbar />
         <div className="center">
           <div className="title">
             <h3>News</h3>
           </div>
           <div className="news-box">
             {news.map((value)=>{
               return(
                <Figure key={value.key}>
                <Figure.Image
                  width='50%'
                  height='50%'
                  alt={value.Title}
                  src={value.Url}
                />
                <Figure.Caption>
                  <h3>{value.Title}</h3>
                  {value.Description}
                </Figure.Caption>
              </Figure>
               )
               
             })}
           </div>
         
         </div>
         <Footer />
      </div>
  );
}
