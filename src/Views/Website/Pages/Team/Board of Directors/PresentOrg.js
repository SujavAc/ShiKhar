import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./BOM.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { fireStore, firebaseStorage } from "../../../../../Firebase/config";
import { useAuth } from "../../../../../Firebase/AuthProvider";

const useStyles = makeStyles((theme) => ({
  action: {
    width: "25%",
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function InvolvedOrg(props) {
  const classes = useStyles();
  const [presorg, setPresorg] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    fireStore
      .collection("Present Organization")
      .where("ID", "==", props.ID)
      .onSnapshot(onPresOrgUpdate);
  }, []);

  const onPresOrgUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Date, ID, Title } = doc.data();
      data.push({
        key: doc.id,
        doc,
        Date,
        ID,
        Title,
      });
    });
    setPresorg(data);
  };

  const handleEdit = () => (key) => {
    
  };
  const handleDelete = (key) => () => {
    fireStore
      .collection("Present Organization")
      .doc(key)
      .delete()
      .then(() => {
        console.log("deleted");
      });
  };

  return (
    <ul>
      {presorg.map((value, index) => {
        return (
          <div key={index}>
            <li key={index}>{value.Title}</li>
            {currentUser ? (
              <div className={classes.action} >
                <IconButton aria-label="edit" onClick={handleEdit(value.key)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={handleDelete(value.key)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </ul>
  );
}
