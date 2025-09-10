import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, ActivityIndicator, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { useMoviesStore } from "../store/useStore";
import SearchComponent from "../components/SearchComponent";
import ListTile from "../components/ListTile";
import { ITEM_WIDTH } from "../core/dimensions";
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from "../core/color";

const MovieListScreen: React.FC<any> = ({ navigation }) => {
  const { movies, loading, fetchMovies, searchMovies, clearSearch } = useMoviesStore();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchMovies(searchQuery);
    } else {
      clearSearch();
    }
  }, [searchQuery]);


  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsSearching(false);
        setSearchQuery('');
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {isSearching ? <SearchComponent
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
        : <View style={styles.appBar}>
          <Text style={styles.appBarTitle}>Watch</Text>
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Icon name="search-outline" size={moderateScale(28)} color="#000" />
          </TouchableOpacity>

        </View>}
      <View style={styles.body}>
        {isSearching ? (

          searchQuery.trim() !== "" ? (
            <View >
              <Text style={{ fontSize: moderateScale(16), fontWeight: "bold", color: "#333", marginVertical: verticalScale(8) }}>
                Total results: {movies.length}
              </Text>
              <View style={styles.divider} />
              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ListTile
                    imageUrl={item.poster_path}
                    title={item.title}
                    subtitle={item.release_date}
                    onPress={() =>
                      navigation.navigate("MovieDetail", {
                        id: item.id,
                      })
                    }
                  />
                )}
                contentContainerStyle={{ paddingBottom: moderateScale(92) }}
              />
            </View>

          ) : (
            <ScrollView contentContainerStyle={styles.gridContainer}>
              <View style={styles.gridWrapper}>
                {movies.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("MovieDetail", {
                        id: item.id,
                      })
                    }
                  >
                    <MovieCard
                      imageUrl={item.poster_path}
                      movieName={item.title}
                      width={ITEM_WIDTH}
                      height={verticalScale(124)}
                      marginTop={18}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )
        ) : (

          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("MovieDetail", {
                    id: item.id,
                  })
                }
              >
                <MovieCard
                  imageUrl={item.poster_path}
                  movieName={item.title}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: moderateScale(92) }}
          />
        )}

      </View>
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  appBar: {
    height: verticalScale(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  appBarTitle: { fontSize: moderateScale(18), fontWeight: "500", color: Colors.text },
  body: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", paddingHorizontal: moderateScale(12) },
  title: { fontSize: moderateScale(20), fontWeight: "500", marginBottom: verticalScale(10) },

  gridContainer: {
    // paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(92),
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  divider: {
    height: 1,
    backgroundColor: "#d1a0a0ff",
    marginBottom: verticalScale(8),
  },
});
