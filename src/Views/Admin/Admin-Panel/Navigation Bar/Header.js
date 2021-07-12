import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CarouselForm from "../../../Website/Components/Carousel/Create Carousel/CreateCarousel";
import NewsEdit from "../../../Website/Pages/News/EditNews";
import EditGallery from "../../../Admin/Admin-Panel/AddGalleryForm/AddImage";
import SignUp from "../../Admin-Panel/Create User/signup";
import EnquiryData from "../../Admin-Panel/Enquiry Data/EnquiryData";
import OrgMessageForm from "../Message from Organisation/OrgMessage";
import { useAuth } from "../../../../Firebase/AuthProvider";


const useStyles = makeStyles((theme) => ({

  toolbarSecondary: {
    width:'100%',
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    cursor:'pointer',
    "&:hover": {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
      }
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const { currentUser, logout } = useAuth();
  const [comp,setComp] = React.useState({state:''});
  const history = useHistory();

  const handleClick = (title) => () =>{
        
        if(comp.state==="Logout"){
            logout();
            history.push("/spadmin");
        }
        else{
            setComp({state:title});
        }
  }

  return (
    <React.Fragment >
     
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            onClick={handleClick(section.title)}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <div>
      {comp.state === "Create Carousel" ? (
              <CarouselForm />
            ) : comp.state === "Create News" ? (
              <NewsEdit />
            ) : comp.state === "Add Image to Gallery" ? (
              <EditGallery />
            ) : comp.state === "Create User" ? (
              <SignUp />
            ) :comp.state === "Enquiry Data" ? (
              <EnquiryData />
            ) : comp.state === "Stakeholder message form" ? (
              <OrgMessageForm />
            ) : (
              <></>
            )}
      </div>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
