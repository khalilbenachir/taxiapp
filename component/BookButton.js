import React from "react";
import { Text, StyleSheet } from "react-native";
import { View, Button } from "native-base";
import { connect } from "react-redux";
import { getbookcar } from "../redux/maps/maps-action";

const BookButton = ({ getBookcar }) => {
  return (
    <Button style={styles.buttonStyle} onPress={getBookcar}>
      <Text style={styles.btnText}>BOOK</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: "#fff",
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#ff5e3a",
    bottom: 120,
    right: 20,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  disabledState: {
    backgroundColor: "#d7d7d7"
  },
  activeState: {
    backgroundColor: "#ff5e3a"
  },
  btnText: {
    fontSize: 16,
    color: "#fff"
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 12
  }
});

const mapDispatchToProps = dispatch => ({
  getBookcar: () => dispatch(getbookcar())
});

export default connect(
  null,
  mapDispatchToProps
)(BookButton);
