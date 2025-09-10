import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

interface MovieCardProps {
  imageUrl: string;
  movieName: string;
  releaseDate?: string;
  width?: number;
  height?: number;
  marginTop?: number;

  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imageUrl,
  movieName,
  releaseDate,
  width = moderateScale(344),
  height = verticalScale(164),
  marginTop = moderateScale(24),

  onPress,
}) => {





  return (
    <View style={[styles.container, { width, height, marginTop }]}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${imageUrl}` } as ImageSourcePropType}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.innerShadow}
      />
      <View style={styles.textContainer}>
        <Text style={styles.movieName}>{movieName}</Text>
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(344),
    height: verticalScale(164),
    borderRadius: moderateScale(14),
    overflow: "hidden",
    backgroundColor: "#fff",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  innerShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(70),
  },
  textContainer: {
    position: "absolute",
    bottom: verticalScale(12),
    left: moderateScale(12),
    right: moderateScale(12),
  },
  movieName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },

  tileContainer: {
    width:"100%",
    flexDirection: "row",
    alignItems: "center",
    padding: scale(10),
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tileImage: {
    width: scale(50),
    height: verticalScale(75),
    borderRadius: scale(6),
    marginRight: scale(12),
  },
  tileTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
 


});
