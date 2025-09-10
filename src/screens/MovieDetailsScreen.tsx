import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubePlayer from 'react-native-youtube-iframe';


import { getMovieDetails, getMovieVideos } from "../api/api";
import LinearGradient from "react-native-linear-gradient";
import { Colors, genreColors } from "../core/color";
import WebView from "react-native-webview";


const MovieDetailScreen: React.FC<any> = ({ route, navigation }) => {
  const movieId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>(null);
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  async function fetchMovieDetails() {
    try {
      setLoading(true);
      const details = await getMovieDetails(movieId);
      setMovie(details);

      const vids = await getMovieVideos(movieId);
      const trailer = vids.find(
        (vid: { type: string; site: string }) =>
          vid.type === "Trailer" &&
          (vid.site === "YouTube")
      );
      if (trailer) setTrailerKey(`https://www.youtube.com/watch?v=thOYFqARMLo`);
    } catch (error) {
      console.log("Error fetching movie details", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !movie) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />


      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(90) }}
      >
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.banner}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.bannerOverlay}
          />

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}  >

              <Icon name="chevron-back" size={moderateScale(24)} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.watchTitle}>Watch</Text>
            <View style={{ width: moderateScale(24) }} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.movieTitle}>{movie.title}</Text>

            <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}  >
              <Text style={styles.primaryButtonText}>Watch Now</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.4}
              style={styles.outlineButton}
              onPress={() => {
                if (trailerKey) setPlayingTrailer(true);
                else Alert.alert("Trailer not available");
              }}
            >
              <Icon name="play-circle-outline" size={moderateScale(18)} color="#fff" />
              <Text style={styles.outlineButtonText}> Watch Trailer</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.bottomContainer}>
          <Text style={styles.genresHeading}>Genres</Text>

          <View style={styles.genresWrapper}>
            {movie.genres.map((item: any, index: number) => (
              <View
                key={item.id}
                style={[
                  styles.genreChip,
                  { backgroundColor: genreColors[index % genreColors.length] },
                ]}
              >
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.overviewHeading}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>

      </ScrollView>
      <Modal visible={playingTrailer} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {trailerKey ? (
            <View style={styles.playerWrapper}>

              <YoutubePlayer
              width={scale(320)}
                height={250}
                play={true}
                videoId={trailerKey.split("v=")[1]}
                onChangeState={(state: string) => {
                  if (state === "ended") {
                    setPlayingTrailer(false);
                  }
                }}
                webViewProps={{
                  androidLayerType: "hardware",
                }}
              />

              <TouchableOpacity
                onPress={() => setPlayingTrailer(false)}
                style={styles.closeButton}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>✕ Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noTrailerWrapper}>
              <Text style={styles.noTrailerText}>Trailer not available</Text>
              <TouchableOpacity
                onPress={() => setPlayingTrailer(false)}
                style={styles.closeButtonAlt}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>




<TouchableOpacity
  style={styles.gotoSeat}
  onPress={() => navigation.navigate("Seats")}
>
  <Text style={styles.gotoSeatButtonText}>Select Seats</Text>
</TouchableOpacity>

    </View>


  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    width: "100%",
    height: verticalScale(400),
    justifyContent: "flex-end",
    paddingBottom: verticalScale(24),
    marginBottom: scale(12),
    position: "relative",
    backgroundColor: "black",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(100),
  },
  headerRow: {
    position: "absolute",
    top: verticalScale(44),
    left: scale(16),
    right: scale(16),
    flexDirection: "row",

  },
  backButton: {

    padding: moderateScale(8),
  },
  watchTitle: {
    color: "#fff",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginLeft: moderateScale(16),
  },
  contentContainer: {
    alignItems: "center",
  },
  movieTitle: {
    color: "#fff",
    fontSize: moderateScale(28),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: Colors.button,
    width: scale(244),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(10),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  playerWrapper: {
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 4,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  noTrailerWrapper: {
    alignItems: "center",
  },
  noTrailerText: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 20,
  },
  closeButtonAlt: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "600",
    textAlign: "center",
  },
  outlineButton: {
    flexDirection: "row",
    width: scale(244),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.button,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "600",
    marginLeft: scale(6),
    textAlign: "center",
  },
  bottomContainer: {
    paddingHorizontal: scale(18),
  },
  genresHeading: {

    fontWeight: "bold",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(12),
  },
  genresWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",

  },
  genreChip: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  genreText: {
    color: "#fff",
    fontSize: moderateScale(12),
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: verticalScale(16),
  },
  overviewHeading: {
    fontSize: moderateScale(20),
    fontWeight: "bold",

    marginBottom: verticalScale(8),
  },
  overviewText: {
    fontSize: moderateScale(16),
    color: "#8F8F8F",
    lineHeight: moderateScale(22),
  },

  doneButton: {
    padding: moderateScale(16),
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },


  gotoSeat: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(16),
    right: scale(16),
    backgroundColor: Colors.button,
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  gotoSeatButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
});
