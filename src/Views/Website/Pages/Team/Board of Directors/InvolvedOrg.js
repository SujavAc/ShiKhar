import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./BOM.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import { fireStore, firebaseStorage } from "../../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../../../../Firebase/AuthProvider";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "100%",
  //     display: "flex",
  //     flexDirection: "rows",
  //     alignItems: "center",
  //     justifyContent: "space-between",
  //   },
  //   title: {
  //     width: "80%",
  //   },
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
  const [pastorg, setPastorg] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    fireStore
      .collection("Past Organization")
      .where("ID", "==", props.ID)
      .onSnapshot(onPastOrgUpdate);
  }, [pastorg]);

  const onPastOrgUpdate = (querySnapshot) => {
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
    setPastorg(data);
  };
  const handleDelete = (key) => () => {
    fireStore
      .collection("Past Organization")
      .doc(key)
      .delete()
      .then(() => {
        console.log("deleted");
      });
  };

  return (
    <ul>
      {pastorg.map((value, index) => {
        return (
          <div className={classes.root} key={index}>
            <li key={index}>{value.Title}</li>

            {currentUser ? (
              <div className={classes.action}>
                <Button color="primary">
                  <EditIcon />
                </Button>
                <Button onClick={handleDelete(value.key)} color="secondary">
                  <DeleteIcon />
                </Button>
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
