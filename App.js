import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  Modal,
  Button
} from "react-native";
import FadeInView from "./components/FadeInView";

const App = () => {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {}
  });
  const [visible, setVisible] = useState(true);
  const url = " http://www.omdbapi.com/?i=tt3896198&apikey=1d0f5583";
  const handleSubmit = () => {
    axios(url + "&s=" + state.search)
      .then(({ data }) => {
        let results = data.Search;
        console.log(results);
        setState(prev => {
          return { ...prev, results: results, search: "" };
        });
      })
      .catch(err => console.log(err));
  };
  const openPopUp = id => {
    axios(url + "&y=" + id).then(({ data }) => {
      let results = data;
      console.log(results);
      setState(prev => {
        return { ...prev, selected: results };
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOVIE DB</Text>
      <TextInput
        onChangeText={text =>
          setState(prev => {
            return { ...prev, search: text };
          })
        }
        placeholder="Enter a movie"
        onFocus={() =>
          setState(prev => {
            return { ...prev };
          })
        }
        style={styles.textInput}
        value={state.search}
        onSubmitEditing={handleSubmit}
      />
      <ScrollView style={styles.list}>
        {state.results.map(result => {
          return (
            <TouchableHighlight
              activeOpacity={0.1}
              key={result.title}
              onPress={() => openPopUp(result.title)}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <FadeInView style={{ ...styles.result }}>
                <Image
                  source={{ uri: result.Poster }}
                  style={{
                    width: "100%",
                    height: 370,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.heading}>{result.Title}</Text>
              </FadeInView>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
      <Modal
        visible={visible && typeof state.selected.Title != "undefined"}
        animationType="fade"
        transparent={false}
      >
        <View>
          <Text>{state.selected.Title}</Text>
          <Button
            onPress={() => {
              setVisible(false);
            }}
            title="back"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111820",
    alignItems: "center",
    paddingTop: 50
  },
  title: {
    color: "#f3aa4e",
    fontSize: 24,
    fontWeight: "600"
  },
  textInput: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "80%",
    marginVertical: 16,
    height: 50
  },
  list: {
    flex: 1,
    width: "100%",
    marginBottom: 20
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    padding: 20
  },
  result: {
    width: "70%",
    backgroundColor: "rgb(43, 44, 44)",
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  }
});
export default App;
