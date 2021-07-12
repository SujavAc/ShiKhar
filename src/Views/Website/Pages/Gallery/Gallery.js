import React from "react";
import "./Gallery.scss";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Navigationbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Image, Card, Col } from "react-bootstrap";
import { fireStore, firebaseStorage } from "../../../../Firebase/config";
import { useAuth } from "../../../../Firebase/AuthProvider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import EditGallery from "./editgallery";
import DeleteGallery from "./DeleteGallery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
    // width: 500,
    // height: 450,
  },
  button: {
    display: "flex",
    flexDirection: "rows",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Gallery() {
  const [gallery, setGallery] = React.useState([]);
  const [editform, setEditForm] = React.useState(false);
  const { currentUser } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    fireStore.collection("Gallery").onSnapshot(onGalleryUpdate);
  }, [gallery]);

  const onGalleryUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Comment, Date, Url, ImageName } = doc.data();
      data.push({
        key: doc.id,
        doc,
        Comment,
        Date,
        ImageName,
        Url,
      });
    });
    setGallery(data);
  };

  // const handelDelete=(id,name)=>()=>{
  //   firebaseStorage.storageRef().child('Gallery'/name).delete().then(() => {
  //     fireStore.collection('Gallery').doc(id).delete().then(()=>{

  //       console.log('delete successfully');
  //     }).catch((error)=>{
  //       console.log(error);
  //     })
  //     // File deleted successfully
  //   }).catch((error) => {
  //     // Uh-oh, an error occurred!
  //   });

  // }

  return (
    <div id="Gallery">
      <Navigationbar />
      <div className="center">
        <div className="title">
          <h3>Gallery</h3>
        </div>
        <div className="imagebox">
          <div className={classes.root}>
            <Grid container spacing={3}>
              {gallery.map((data, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      {currentUser ? (
                        <div className={classes.button}>
                          <EditGallery
                            id={data.key}
                            comment={data.Comment}
                            url={data.Url}
                            imgName={data.ImageName}
                          />
                          <DeleteGallery
                            id={data.key}
                            imgName={data.ImageName}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <img
                      src={data.Url}
                      alt={data.Comment}
                      height="100%"
                      width="100%"
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            {/* <GridList cellHeight={160} className={classes.gridList} cols={2}>

              {gallery.map((data, index) => {
                return (
                  <GridListTile key={index}>
                     <div style={{display:'flex',}}>
                     <div>
                  {currentUser ? (
                    <div className={classes.button}>
                      <EditGallery  id = {data.key} comment={data.Comment} url={data.Url} imgName={data.ImageName} />
                      <DeleteGallery id={data.key} imgName={data.ImageName}  />
                    </div>
                    ):(<></>)}
                    </div>
                    <img src={data.Url} alt={data.Comment} height="100%" width="100%"/>
                    </div>
                    <GridListTileBar
                    actionPosition={'left'}
                    titlePosition={'left'}
                      title={data.Comment}
                      
                      
                    />
                  </GridListTile>
                  
                  
                 
                  );
              })}
                   
            </GridList> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
