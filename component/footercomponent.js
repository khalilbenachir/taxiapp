/* @flow weak */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Footer, FooterTab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const FooterComponent = ({}) => {
  const tabs = [
    {
      title: "TaxiCar",
      subtitle: "",
      icon: "car"
    },
    {
      title: "TaxiShare",
      subtitle: "",
      icon: "car"
    },
    {
      title: "TaxiPremium",
      subtitle: "",
      icon: "car"
    },
    {
      title: "TaxiBike",
      subtitle: "",
      icon: "car"
    }
  ];
  {
    Icon.loadFont();
  }
  return (
    <Footer>
      <FooterTab style={styles.container} iosBarStyle="light-content">
        {tabs.map((tab, index) => {
          return (
            <Button key={index}>
              <Icon
                style={{ paddingTop: 15 }}
                size={20}
                name={tab.icon}
                color={index === 0 ? "#ff5e3a" : "grey"}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: index === 0 ? "#ff5e3a" : "grey"
                }}
              >
                {tab.title}
              </Text>
              <Text style={styles.subtext}>{tab.subtitle}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  subtext: {
    fontSize: 8
  }
});
